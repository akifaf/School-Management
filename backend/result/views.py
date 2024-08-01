# views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Result, Syllabus
from .serializers import ResultSerializer, SyllabusSerializer
from django.shortcuts import get_object_or_404
from main.serializers import ClassroomSerializer
from main.models import ClassRoom


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Syllabus 
from .serializers import SyllabusSerializer

class ResultListCreateView(generics.ListCreateAPIView):
    queryset = Result.objects.all()
    serializer = ResultSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = ResultSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResultDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Result.objects.all()
    serializer = ResultSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ResultSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
