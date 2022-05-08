from django.urls import path
from .views import get_filter, VacancyApiView, get_vacancy, get_job_applications, get_resume

urlpatterns = [
    path('get_filter/', get_filter),
    path('vacancy/', get_vacancy),
    path('vacancy/<int:pk>/', get_vacancy),
    path('authorvacancy/', VacancyApiView.as_view()),
    path('authorvacancy/<int:pk>/', VacancyApiView.as_view()),
    path('job_application/', get_job_applications),
    path('resume/<int:pk>/', get_resume),
    path('resume/', get_resume),
]
