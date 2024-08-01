# urls.py
from django.urls import path
from .views import ResultListCreateView, ResultDetailView, SyllabusListView

urlpatterns = [
    path('', ResultListCreateView.as_view(), name='result-list-create'),
    path('<int:pk>/', ResultDetailView.as_view(), name='result-detail'),
    path('syllabus/', SyllabusListView.as_view(), name='syllabus-list'),
]
