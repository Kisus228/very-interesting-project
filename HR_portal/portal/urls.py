from django.urls import path
from .views import get_filter, VacancyApiView, VacancyList

urlpatterns = [
    path('get_filter/', get_filter),
    path('vacancy/', VacancyList.as_view()),
    path('vacancy/<int:pk>/', VacancyList.as_view()),
    path('authorvacancy/', VacancyApiView.as_view()),
    path('authorvacancy/<int:pk>/', VacancyApiView.as_view()),
]
