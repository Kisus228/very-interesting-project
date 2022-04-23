from django.urls import path
from .views import get_filter, VacancyApiView, get_vacancy

urlpatterns = [
    path('get_filter/', get_filter),
    path('vacancy/', get_vacancy),
    path('vacancy/<int:pk>/', get_vacancy),
    path('authorvacancy/', VacancyApiView.as_view()),
    path('authorvacancy/<int:pk>/', VacancyApiView.as_view()),
]
