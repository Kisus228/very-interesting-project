from django.urls import path
from .views import get_filter, get_author_vacancy_list, get_vacancy_filter

urlpatterns = [
    path('get_filter/', get_filter),
    path('author/vacancy/', get_author_vacancy_list),
    path('vacancy/', get_vacancy_filter)
]
