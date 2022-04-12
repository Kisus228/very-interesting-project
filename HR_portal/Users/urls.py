from django.urls import path
from .views import LoginApiView, user_logout, RegisterUserView


urlpatterns = [
    path('api/login/', LoginApiView.as_view()),
    path('api/logout/', user_logout),
    path('registration/', RegisterUserView.as_view()),

]
