# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from rest_framework import viewsets

from rest_api.serializers import UserSerializer, TodoListSerializer, TaskListSerializer
from tasks.models import Task, TodoList
from users.models import CustomUser


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all().order_by('-date_joined')

    # def get_queryset(self):
    #     qs =
    #
    #     return qs


class TodoListViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer


class TaskListViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer
