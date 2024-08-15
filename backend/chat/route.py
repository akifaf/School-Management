from django.urls import path
from .consumers import PersonalChatConsumer

websocket_url_patterns = [
    path('ws/chat/', PersonalChatConsumer.as_asgi())
]
