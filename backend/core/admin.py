from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from django.urls import path
from django.shortcuts import render
from django.contrib.admin import AdminSite
from django.db.models import Count
from django.db.models.functions import TruncMonth
from .models import User, Claim

class SoroSuranceAdminSite(AdminSite):
    site_header = 'SoroSurance Administration'
    site_title = 'SoroSurance Admin'
    index_title = 'Dashboard'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard_view), name='dashboard'),
            path('settings/', self.admin_view(self.settings_view), name='settings'),
            path('user-management/', self.admin_view(self.user_management_view), name='user_management'),
            path('claims/', self.admin_view(self.claims_view), name='claims'),
            path('claims/<int:claim_id>/', self.admin_view(self.claim_detail_view), name='claim_detail'),
        ]
        return custom_urls + urls

    def dashboard_view(self, request):
        # Get real data from the database
        total_claims = Claim.objects.count()
        approved_claims = Claim.objects.filter(status='approved').count()
        pending_claims = Claim.objects.filter(status='pending').count()
        rejected_claims = Claim.objects.filter(status='rejected').count()
        
        # Get claims by type for chart
        claim_types = Claim.objects.values('claim_type').annotate(count=Count('id'))
        type_labels = []
        type_values = []
        for item in claim_types:
            type_labels.append(item['claim_type'])
            type_values.append(item['count'])
        
        # Get monthly claims for trend chart
        monthly_claims = Claim.objects.annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            count=Count('id')
        ).order_by('month')
        
        month_labels = []
        month_values = []
        for item in monthly_claims:
            if item['month']:
                month_labels.append(item['month'].strftime('%b %Y'))
                month_values.append(item['count'])
        
        # Get recent claims for activity feed
        recent_claims = Claim.objects.select_related('user').order_by('-created_at')[:10]
        
        # Calculate percentage changes (simplified - comparing to last 30 days)
        from datetime import datetime, timedelta
        thirty_days_ago = datetime.now() - timedelta(days=30)
        
        recent_total = Claim.objects.filter(created_at__gte=thirty_days_ago).count()
        recent_approved = Claim.objects.filter(
            status='approved', 
            created_at__gte=thirty_days_ago
        ).count()
        
        context = {
            'total_claims': total_claims,
            'approved_claims': approved_claims,
            'pending_claims': pending_claims,
            'rejected_claims': rejected_claims,
            'recent_claims': recent_claims,
            'chart_data': {
                'status_labels': ['Pending', 'Approved', 'Rejected'],
                'status_values': [pending_claims, approved_claims, rejected_claims],
                'type_labels': type_labels,
                'type_values': type_values,
                'month_labels': month_labels,
                'month_values': month_values,
            }
        }
        return render(request, 'admin/index.html', context)

    def settings_view(self, request):
        # Sample data for the settings page
        context = {
            'api_key': 'sk_live_1234567890abcdef1234567890abcdef',
            'selected_stt': 'google',
            'selected_language': 'english',
        }
        return render(request, 'admin/settings.html', context)

    def user_management_view(self, request):
        # Fetch all users from the database
        users = User.objects.all().order_by('-date_joined')
        context = {
            'users': users,
        }
        return render(request, 'admin/user_management.html', context)

    def claims_view(self, request):
        # Get the active tab from the query parameters
        active_tab = request.GET.get('tab', 'All')
        
        # Fetch claims from the database based on the active tab
        if active_tab == 'All':
            claims = Claim.objects.all().order_by('-created_at')
        elif active_tab == 'Pending':
            claims = Claim.objects.filter(status='pending').order_by('-created_at')
        elif active_tab == 'Approved':
            claims = Claim.objects.filter(status='approved').order_by('-created_at')
        elif active_tab == 'Fraud Flagged':
            claims = Claim.objects.filter(status='rejected').order_by('-created_at')
        else:
            claims = Claim.objects.all().order_by('-created_at')
        
        context = {
            'claims': claims,
            'active_tab': active_tab,
        }
        return render(request, 'admin/claims.html', context)

    def claim_detail_view(self, request, claim_id):
        """Display detailed information about a specific claim."""
        try:
            claim = Claim.objects.select_related('user').get(id=claim_id)
        except Claim.DoesNotExist:
            from django.http import Http404
            raise Http404("Claim not found")
        
        context = {
            'claim': claim,
            'claim_id': claim.claim_id,
            'title': f'Claim #{claim.claim_id} Details',
        }
        return render(request, 'admin/claim_detail.html', context)

# Create an instance of our custom admin site
sorosurance_admin_site = SoroSuranceAdminSite(name='sorosurance_admin')

@admin.register(User, site=sorosurance_admin_site)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'full_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_active')

    ordering = ('email',)
    search_fields = ('email', 'full_name')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('full_name', 'phone')}),
        (_('Permissions'), {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role', 'full_name', 'phone'),
        }),
    )

@admin.register(Claim, site=sorosurance_admin_site)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('claim_id', 'claim_type', 'location', 'status', 'created_at')
    search_fields = ('claim_id', 'location', 'status')
    list_filter = ('status', 'claim_type')
    ordering = ('-created_at',)
