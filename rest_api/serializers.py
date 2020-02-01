# -*- coding: utf-8 -*-

# from django.contrib.auth.models import User
from rest_framework import serializers

from tasks.models import TodoList, Task
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = 'all'
        fields = [
            # 'url',
            'username',
            'email',
            # 'groups'
        ]


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ['label', 'is_enabled']


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['list', 'description', 'is_completed']
