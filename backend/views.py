from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from backend.serializers import UserSerializer, CourseSerializer, CourseMemberSerializer
from backend.models import Course, CourseMember


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(archived=False)
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        course = self.get_object()
        members = course.members.all()
        page = self.paginate_queryset(members)

        if page is not None:
            serializer = CourseMemberSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CourseMemberSerializer(members, many=True)
        return Response(serializer.data)