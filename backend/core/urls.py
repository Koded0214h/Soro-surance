from django.urls import path

from . import views

urlpatterns = [
    path('claims/', views.ClaimCreateView.as_view(), name='submit-claim'),
    path('claims/<int:id>/', views.ClaimDetailView.as_view(), name='claim-detail'),
    path('admin/claims/', views.AdminClaimListView.as_view(), name='admin-claim-list'),
    path('claims/track/', views.TrackClaimView.as_view(), name='claim-track'),
    path('admin/claims/<int:id>/', views.AdminClaimUpdateView.as_view(), name='admin-claim-update'),
    path('claims/voice/', views.VoiceToTextView.as_view(), name='voice-to-text'),
    path('claims/<str:claim_id>/upload/', views.AttachmentUploadView.as_view(), name='upload-attachment'),
    path('user/claims/', views.UserClaimListView.as_view(), name='user-claim-list'),
]
