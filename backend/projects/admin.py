from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'rating', 'rank', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter = ['category', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['order', 'id']
