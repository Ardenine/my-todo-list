# -*- coding: utf-8 -*-

from rest_framework import serializers

from tasks.models import TodoList, Task
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'username',
            'email',
        ]


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ['label', 'is_enabled']


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id',
                  # 'key',
                  'description', 'is_completed']
