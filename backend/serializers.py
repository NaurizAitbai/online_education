from django.contrib.auth.models import User
from django.db.models import Avg
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from backend.models import Course, CourseSection, CourseUnit, CourseReview, CourseMember, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(label=_('Профиль'))
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'last_name', 'first_name', 'password', 'profile']
        extra_kwargs = {
            'password': {'write_only': True}
        }


class CourseUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = ['id', 'name', 'content']


class CourseSectionSerializer(serializers.ModelSerializer):
    units = CourseUnitSerializer(many=True, read_only=True)
    class Meta:
        model = CourseSection
        fields = ['name', 'units']


class CourseSerializer(serializers.ModelSerializer):
    sections = CourseSectionSerializer(many=True, read_only=True)
    rating = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'author', 'name', 'thumbnail', 'short_description', 'long_description', 'members', 'reviews', 'rating', 'sections']
        extra_kwargs = {
            'members': {'read_only': True},
        }
    
    def to_representation(self, value):
        data = super().to_representation(value)
        user_serializer = UserSerializer(value.author, context=self.context)
        data['author'] = user_serializer.data

        # TODO: Рефакторинг
        data['members'] = len(data['members'])

        # TODO: Рефакторинг
        data['reviews'] = len(data['reviews'])

        # TODO: Рефакторинг
        reviews = CourseReview.objects.filter(course__id=data['id']).exclude(rating=None)
        rating = reviews.aggregate(Avg('rating'))
        data['rating'] = rating['rating__avg']

        return data


class CourseReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseReview
        fields = ['id', 'course', 'author', 'rating', 'text']

    def to_representation(self, value):
        data = super().to_representation(value)
        course_serializer = CourseSerializer(value.course, context=self.context)
        user_serializer = UserSerializer(value.author, context=self.context)
        data['course'] = course_serializer.data
        data['user'] = user_serializer.data
        return data


class CourseMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMember
        fields = ['id', 'course', 'user']
    
    def to_representation(self, value):
        data = super().to_representation(value)
        course_serializer = CourseSerializer(value.course, context=self.context)
        user_serializer = UserSerializer(value.user, context=self.context)
        data['course'] = course_serializer.data
        data['user'] = user_serializer.data
        return data