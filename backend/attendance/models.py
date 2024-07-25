from django.db import models
from main.models import Student, ClassRoom, Teacher
from datetime import date

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    present = models.BooleanField(default=False)

    class Meta:
        unique_together = ('student', 'date')

    def __str__(self):
        return f"{self.student} - {self.date} - {'Present' if self.present else 'Absent'}"
