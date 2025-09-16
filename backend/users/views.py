from rest_framework import generics, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,
    UpdateProfileSerializer,
    PasswordChangeSerializer,
    AdminUserSerializer
)
from .pagination import UserPagination

User = get_user_model()

class RegisterView(generics.CreateAPIView): 
    queryset = User.objects.all() 
    serializer_class = RegisterSerializer

# --- User profile ---
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UpdateProfileSerializer(request.user)
        return Response(serializer.data)


class UpdateProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateProfileSerializer

    def get_object(self):
        return self.request.user


class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


# --- Admin user management ---
class AdminUserListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    pagination_class = UserPagination

    # Enable filtering, search, and ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Filter by role
    filterset_fields = ['role']
    
    # Search by email, full_name, phone
    search_fields = ['email', 'full_name', 'phone']
    
    # Order by date joined or email
    ordering_fields = ['date_joined', 'email']
    ordering = ['-date_joined']  # default ordering


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()


