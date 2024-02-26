from django.contrib.auth import authenticate
from django.contrib.auth.models import User as AuthUser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserMaster

class LoginView(APIView):
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            user = authenticate(username=username, password=password)
            
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            # users = User.objects.filter(is_active=True).values(
            #     'user_id', 'first_name', 'last_name', 'mobile_no'
            # )
            users = User.objects.filter().values(
                'user_id', 'first_name', 'last_name', 'mobile_no'
            )
            return Response({'data': users}, status=status.HTTP_200_OK)
        except Exception as e:
            print('--- add user (post)', e)
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user_count = User.objects.all().count()
            user_id = str(1000 + user_count)
            
            user = User.objects.create(
                user_id=user_id,
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                email=request.data.get('email'),
                mobile_no=request.data.get('mobile_no'),
                address=request.data.get('address'),
                dob=request.data.get('dob'),
                gender=request.data.get('gender'),
                is_active=False, # false means no exists in master table or deleted
                is_synced=False, # is data synced with master table
                role=request.data.get('role'),
            )
            
            if request.data.get('role') in ('admin', 'creator', 'logger'):
                auth_user = AuthUser.objects.create_user(
                    username=request.data.get('email'),
                    password=request.data.get('password')
                )
                auth_user.save()

            user.save()

            return Response({'message': 'User added successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('--- add user (post)', e)
            return Response({'message': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
