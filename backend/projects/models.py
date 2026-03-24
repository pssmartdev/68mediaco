from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    subtitle = models.CharField(max_length=200, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    rating_count = models.CharField(max_length=20, default='0')
    age = models.CharField(max_length=10, default='4+')
    rank = models.CharField(max_length=10, default='#1')
    rank_category = models.CharField(max_length=100, blank=True)
    developer = models.CharField(max_length=200, default='68 Media Co.')
    size = models.CharField(max_length=20, default='')
    version = models.CharField(max_length=20, default='1.0.0')
    language = models.CharField(max_length=100, default='English')
    images = models.JSONField(default=list, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title
