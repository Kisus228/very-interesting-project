from django.urls import path
from .views_worker import get_filter, VacancyApiView, get_vacancy, get_resume_responding_worker

urlpatterns = [
    path('get_filter/', get_filter),
    path('vacancy/', get_vacancy),
    path('vacancy/<int:pk>/', get_vacancy),
    path('authorvacancy/', VacancyApiView.as_view()),
    path('authorvacancy/<int:pk>/', VacancyApiView.as_view()),
    path('resume/<int:pk>/', get_resume_responding_worker),
    path('resume/', get_resume_responding_worker),
]
