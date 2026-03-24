from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        msg = serializer.save()

        send_mail(
            subject=f'[68 Media] New message from {msg.name}',
            message=f'From: {msg.name} <{msg.email}>\n\n{msg.message}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=True,
        )

        return Response({'success': True, 'message': 'Message received.'}, status=status.HTTP_201_CREATED)
