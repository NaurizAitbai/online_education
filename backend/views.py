from django.contrib.auth.models import User
from rest_framework import viewsets
from backend.serializers import UserSerializer, CourseSerializer, CourseMemberSerializer
from backend.models import Course, CourseMember


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(archived=False)
    serializer_class = CourseSerializer