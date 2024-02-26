from django.urls import path

from .views import LoginView, AddUserView


urlpatterns = [
    path('login', view=LoginView.as_view(), name='login'),
    path('', view=AddUserView.as_view())
]