# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from django.urls import include, path
from rest_framework import routers

from rest_api.views import UserViewSet, TodoListViewSet, TaskListViewSet

app_name = 'api_v1'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'todolists', TodoListViewSet)
router.register(r'tasks', TaskListViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
