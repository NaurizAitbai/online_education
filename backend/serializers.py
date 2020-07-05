from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from backend.models import Course, Profile


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


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'author', 'name', 'thumbnail']
    
    def to_representation(self, value):
        data = super().to_representation(value)
        user_serializer = UserSerializer(value.author, context=self.context)
        data['author'] = user_serializer.data
        return data