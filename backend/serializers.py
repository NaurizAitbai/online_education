from django.contrib.auth.models import User
from rest_framework import serializers
from backend.models import Course


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'last_name', 'first_name']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'author', 'name']