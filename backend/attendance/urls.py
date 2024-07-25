
from django.urls import path
from .views import StudentListByClassAndDate, TakeAttendance, ViewAttendance

urlpatterns = [
    path('<int:class_id>/<str:date_str>/', StudentListByClassAndDate.as_view(), name='student-list-by-class-date'),
    path('take_attendance/', TakeAttendance.as_view(), name='bulk-create-attendance'),
    path('view_attendance/<int:class_id>/<str:date>/', ViewAttendance.as_view(), name='view_attendance'),

]