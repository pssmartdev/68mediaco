from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
