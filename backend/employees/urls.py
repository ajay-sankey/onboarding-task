from django.urls import path

from .views import LoginView, EmployeeView


urlpatterns = [
    path('login', view=LoginView.as_view()),
    path('<int:employee_id>', view=EmployeeView.as_view()),
    path('', view=EmployeeView.as_view()),
]