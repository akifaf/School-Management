# Generated by Django 5.0.6 on 2024-09-18 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_student_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroom',
            name='class_no',
            field=models.PositiveIntegerField(),
        ),
    ]
