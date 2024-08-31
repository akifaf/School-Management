import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from chat.route import websocket_urlpatterns
from chat.channels_middleware import JWTwebsocketMiddleware
from django.conf import settings
settings.configure()



from django.core.asgi import get_asgi_application
application = get_asgi_application()

# import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sms_api.settings")
# django.setup()

application = ProtocolTypeRouter({
    "http": application,  
    "websocket": JWTwebsocketMiddleware(
        AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns
            )
        )
    ), 
})
