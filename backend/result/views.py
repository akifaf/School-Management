# views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ExamType, Result, Syllabus
from .serializers import ResultSerializer, SyllabusSerializer
from django.shortcuts import get_object_or_404
from main.serializers import ClassroomSerializer
from main.models import ClassRoom, Student
from rest_framework.permissions import IsAdminUser
from .serializers import ExamTypeSerializer
from django.db import IntegrityError


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Syllabus 
from .serializers import SyllabusSerializer
from rest_framework.exceptions import NotFound

class ResultCreateView(generics.ListCreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = ResultSerializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "A result for this student, syllabus, and exam type already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResultDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ResultSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResultListView(generics.ListAPIView):
    serializer_class = ResultSerializer

    def get_queryset(self):
        student_id = self.kwargs['pk']
        student = Student.objects.get(id=student_id)
        return Result.objects.filter(student=student)

class SyllabusListView(generics.ListCreateAPIView):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer


class TeacherClassListView(generics.ListAPIView):
    serializer_class = ClassroomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_teacher:
            return ClassRoom.objects.filter(classsubjectteacher__teacher=user)
        return ClassRoom.objects.none()
    
class ExamTypeView(generics.ListCreateAPIView):
    queryset = ExamType.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExamTypeSerializer

class ExamTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExamType.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExamTypeSerializer

class SyllabusByClassroomView(generics.ListAPIView):
    serializer_class = SyllabusSerializer

    def get_queryset(self):
        # Retrieve the 'id' from the URL parameters (assuming it's passed as part of the URL)
        classroom_id = self.kwargs.get('id')  # 'id' should match the name in your URL pattern

        try:
            class_room = ClassRoom.objects.get(id=classroom_id)
        except ClassRoom.DoesNotExist:
            raise NotFound(detail="ClassRoom not found")

        # Filter the Syllabus objects based on the classroom
        return Syllabus.objects.filter(classroom=class_room)
    

class SyllabusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
    # permission_classes = [IsAuthenticated]