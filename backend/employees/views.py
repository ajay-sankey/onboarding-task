import sys

from django.contrib.auth import authenticate
from django.contrib.auth.models import User as AuthUser
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Employee
from .serializers import LoginRequestSerializer, EmployeeRawSerializer, EmployeeSerializer


class LoginView(APIView):

    def post(self, request):
        try:
            serializer = LoginRequestSerializer(data=request.data)
            if serializer.is_valid():
                user = authenticate(
                    username=serializer.validated_data['email'],
                    password=serializer.validated_data['password']    
                )
                if user:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'access_token': str(refresh.access_token),
                        'refresh_token': str(refresh)
                    }, status=status.HTTP_200_OK)
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            print(f'--- LoginView. {exc_type}: {exc_obj} at line {exc_tb.tb_lineno}')
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmployeeView(APIView, LimitOffsetPagination):

    permission_classes = [IsAuthenticated]

    def get(self, request, employee_id=None):
        try:
            if employee_id:
                employees = Employee.objects.filter(employee_id=employee_id)
                serializer = EmployeeSerializer(employees, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        
            employees = Employee.objects.all()
            employees = self.paginate_queryset(employees, request, view=self)
            serializer = EmployeeSerializer(employees, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            print(f'--- EmployeeView.get {exc_type}: {exc_obj} at line {exc_tb.tb_lineno}')
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            raw_serializer = EmployeeRawSerializer(data=request.data)
            if raw_serializer.is_valid():
                raw_serializer.save()

                # ---------- TODO: sync-workflow ----------
                import random
                import string

                request.data['employee_id'] = raw_serializer.data['employee_id']
                request.data['full_name'] = f"{raw_serializer.validated_data['first_name']} {raw_serializer.validated_data['last_name']}"
                request.data['email'] = f"{raw_serializer.validated_data['first_name'].lower()}.{str(raw_serializer.data['employee_id'])}@onboarding.task"

                # --- TODO: encrypt password ---
                request.data['password'] = ''.join(random.sample(string.ascii_letters + string.digits, k=6))
                request.data['is_active'] = True
                request.data['is_synced'] = True

                serializer = EmployeeSerializer(data=request.data)

                if serializer.is_valid():
                    serializer.save()

                    # --- TODO: convert this to API, which can be used by sync workflow ---
                    auth_user = AuthUser.objects.create_user(
                        username=request.data['email'], password=request.data['password']
                    )
                    auth_user.save()
                    # ---------------------------------------------------------------------

                    # --- TODO: send credentials to employee, via mail ---

                    return Response(serializer.data, status=status.HTTP_200_OK)
                # -----------------------------------------

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(raw_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            print(f'--- EmployeeView.post {exc_type}: {exc_obj} at line {exc_tb.tb_lineno}')
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
