from django.db import models

from users.models import CustomUser


class TodoList(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    label = models.CharField(max_length=200, unique=True)
    is_enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.label


class Task(models.Model):
    list = models.ForeignKey(TodoList, on_delete=models.CASCADE, blank=True, null=True)
    # key = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.description}: ' + 'done' if self.is_completed else 'pending'
