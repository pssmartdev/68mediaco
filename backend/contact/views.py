from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer

RATE_LIMIT = 3        # max submissions
RATE_WINDOW = 60 * 60 # per hour (seconds)


class ContactView(APIView):
    def post(self, request):
        ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR', '')).split(',')[0].strip()
        cache_key = f'contact_rate_{ip}'
        count = cache.get(cache_key, 0)

        if count >= RATE_LIMIT:
            return Response(
                {'error': 'Too many requests. Please try again later.'},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        msg = serializer.save()
        cache.set(cache_key, count + 1, RATE_WINDOW)

        send_mail(
            subject=f'[68 Media] New message from {msg.name}',
            message=f'From: {msg.name} <{msg.email}>\n\n{msg.message}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=True,
        )

        return Response({'success': True, 'message': 'Message received.'}, status=status.HTTP_201_CREATED)
