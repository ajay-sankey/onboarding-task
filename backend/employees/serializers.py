from rest_framework import serializers
from .models import EmployeeRaw, Employee


class EmployeeRawSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeRaw
        fields = [
            'employee_id', 'salutation', 'first_name', 'last_name', 'personal_email', 'date_of_birth', 'contact_number', 'position', 'role', 'city', 'gender', 'is_synced', 'is_active'
        ]

class EmployeeSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = Employee
        fields = [
            'employee_id', 'salutation', 'first_name', 'last_name', 'personal_email', 'full_name', 'email', 'password', 'date_of_birth', 'contact_number', 'position', 'role', 'city', 'gender', 'is_synced', 'is_active'
        ]


class LoginRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    
    class Meta:
        fields = '__all__'
