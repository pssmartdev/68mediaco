from rest_framework import serializers
from django.utils import timezone
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    updated = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'description', 'subtitle',
            'rating', 'rating_count', 'age', 'rank', 'rank_category',
            'developer', 'size', 'version', 'language', 'updated', 'images',
        ]

    def get_updated(self, obj):
        delta = timezone.now() - obj.updated_at
        if delta.days == 0:
            return 'Today'
        elif delta.days == 1:
            return '1d ago'
        else:
            return f'{delta.days}d ago'
