from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # --- Auth ---
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # --- User actions ---
    path('user/profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('user/profile/update/', views.UpdateProfileView.as_view(), name='update-profile'),
    path('user/password/change/', views.PasswordChangeView.as_view(), name='password-change'),

    # --- Admin actions ---
    path('admin/users/', views.AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/users/<int:pk>/', views.AdminUserDetailView.as_view(), name='admin-user-detail'),
]
