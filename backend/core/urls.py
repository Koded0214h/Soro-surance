from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('claims/', views.ClaimCreateView.as_view(), name='submit-claim'),
    path('claims/<int:id>/', views.ClaimDetailView.as_view(), name='claim-detail'),
    path('admin/claims/', views.AdminClaimListView.as_view(), name='admin-claim-list'),
    path('claims/track/', views.TrackClaimView.as_view(), name='claim-track'),
    path('admin/claims/<int:id>/', views.AdminClaimUpdateView.as_view(), name='admin-claim-update'),
    path('claims/voice/', views.VoiceToTextView.as_view(), name='voice-to-text'),
    path('claims/voice-claim/', views.VoiceClaimView.as_view(), name='voice-claim'),
    path('claims/<str:claim_id>/upload/', views.AttachmentUploadView.as_view(), name='upload-attachment'),
    path('user/claims/', views.UserClaimListView.as_view(), name='user-claim-list'),
    path('user/profile/', views.UserProfileView.as_view(), name='user-profile'),
    
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
