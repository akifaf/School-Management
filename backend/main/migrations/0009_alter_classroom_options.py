# Generated by Django 5.0.6 on 2024-07-25 01:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_remove_teacher_subject_teacher_subject'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='classroom',
            options={'ordering': ['class_no']},
        ),
    ]
