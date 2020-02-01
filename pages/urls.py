from django.urls import path

from .views import HomePageView, AboutPageView, TODOPageView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('about/', AboutPageView.as_view(), name='about'),
    path('tasks/', TODOPageView.as_view(), name='todo-list'),
]
