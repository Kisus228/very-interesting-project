from django.urls import path
from .views import LoginApiView, user_logout, RegisterUserView


urlpatterns = [
    path('login/', LoginApiView.as_view()),
    path('logout/', user_logout),
    path('registration/', RegisterUserView.as_view()),

]
