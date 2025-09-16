from django.urls import path

from . import views

urlpatterns = [
    path('claims/', views.ClaimCreateView.as_view(), name='submit-claim'),
    path('claims/<int:id>/', views.ClaimDetailView.as_view(), name='claim-detail'),
    path('claims/track/', views.TrackClaimView.as_view(), name='claim-track'),
    path('claims/<str:claim_id>/upload/', views.AttachmentUploadView.as_view(), name='upload-attachment'),
    path('user/claims/', views.UserClaimListView.as_view(), name='user-claim-list'),
]
