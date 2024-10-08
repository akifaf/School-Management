from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from result.models import Syllabus
from .models import Attendance
from main.models import Student, ClassRoom
from .serializers import AttendanceSerializer
from main.serializers import StudentSerializer
from datetime import date
import datetime


class StudentListByClassAndDate(APIView):

    def get(self, request, class_id, date_str):
        class_room = ClassRoom.objects.get(id=class_id)
        students = Student.objects.filter(class_room=class_room)
        attendance_date = date.fromisoformat(date_str)
        attendance_records = Attendance.objects.filter(student__in=students, date=attendance_date)
        student_serializer = StudentSerializer(students, many=True)
        attendance_serializer = AttendanceSerializer(attendance_records, many=True)
        return Response({
            'students': student_serializer.data,
            'attendance': attendance_serializer.data
        })

class TakeAttendance(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data, many=True)
        user = request.user
        if user.is_teacher:
            student_ids = [attendance.get('student') for attendance in request.data]
            students = Student.objects.filter(id__in=student_ids)
            classroom = students.first().class_room
            assigned_syllabus = Syllabus.objects.filter(classroom=classroom, teacher=user)
            if not assigned_syllabus.exists():
                raise PermissionDenied("You are not authorized to take attendance for this class.")
        else :
            raise PermissionDenied("You are not authorized to take attendance.")        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ViewAttendance(APIView):
     
    def get(self, request, class_id, date):
        attendance_records = Attendance.objects.filter(student__class_room_id=class_id, date=date)
        serializer = AttendanceSerializer(attendance_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, class_id, date):
        today = datetime.date.today()
        for record in request.data:
            attendance = Attendance.objects.get(student_id=record['student'], date=date)
            attendance.present = record['present']
            attendance.save()
        return Response(status=status.HTTP_200_OK)

class StudentAttendanceView(APIView):
    def get(self, request, student_id):
        
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')
        
        if from_date and to_date:
            attendance_records = Attendance.objects.filter(student_id=student_id, date__range=[from_date, to_date])
        elif from_date:
            attendance_records = Attendance.objects.filter(student_id=student_id, date__gte=from_date)
        elif to_date:
            attendance_records = Attendance.objects.filter(student_id=student_id, date__lte=to_date)
        else:
            attendance_records = Attendance.objects.filter(student_id=student_id)
        
        serializer = AttendanceSerializer(attendance_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)