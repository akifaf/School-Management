from django.urls import path
from . import views

urlpatterns = [
    path('user/<int:user_id1>/<int:user_id2>/',views.MessageListView.as_view(),name='index'),
    path('add_chat_rooms/',views.AddChatRoom ,name='add_chat_room'),
    path('chat_users/<int:user_id>/',views.ListChatUsers,name='chatuserslist'),
    path('notification', views.ChatNotificationView.as_view())
    ]