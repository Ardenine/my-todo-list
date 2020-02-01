from django.db import models


class TodoList(models.Model):
    label = models.CharField(max_length=200, unique=True)
    is_enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.label


class Task(models.Model):
    list = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.description}: ' + 'done' if self.is_completed else 'pending'
