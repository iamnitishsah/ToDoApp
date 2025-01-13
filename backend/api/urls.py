from django.urls import path
from . import views

urlpatterns = [
    path('task/', views.TaskListCreate.as_view(), name='task-list-create'),
    path('task/<int:pk>/', views.TaskUpdateDelete.as_view(), name='task-update-delete'),
]