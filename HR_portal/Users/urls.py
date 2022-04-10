from django.urls import path
from .views import LoginApiView, user_logout


urlpatterns = [
    path('api/login/', LoginApiView.as_view()),
    path('api/logout/', user_logout),
]
