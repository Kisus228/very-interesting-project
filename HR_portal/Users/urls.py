from django.urls import path
from .views import LoginApiView, user_logout, RegisterUserView, is_authenticate


urlpatterns = [
    path('login/', LoginApiView.as_view()),
    path('logout/', user_logout),
    path('registration/', RegisterUserView.as_view()),
    path('is_authenticate/', is_authenticate),
]
