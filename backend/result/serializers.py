# serializers.py
from rest_framework import serializers
from .models import Result, Syllabus

class SyllabusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Syllabus
        fields = ['id', 'classroom', 'subject', 'teacher']

    def validate(self, data):
        teacher = data.get('teacher')
        subject = data.get('subject')
        classroom = data.get('classroom')

        if Syllabus.objects.filter(classroom=classroom, subject=subject, teacher=teacher).exists():
            raise serializers.ValidationError(
                "This combination of classroom, subject, and teacher already exists."
            )

        if not teacher.subject.filter(id=subject.id).exists():
            raise serializers.ValidationError("This Teacher does not teach the selected subject.")

        return data

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'student', 'syllabus', 'assignment_mark', 'exam_mark', 'created_at', 'updated_at']
