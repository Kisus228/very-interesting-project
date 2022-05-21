from django.urls import path
from .views import LoginApiView, user_logout, RegisterUserView, is_authenticate, get_photo


urlpatterns = [
    path('login/', LoginApiView.as_view()),
    path('logout/', user_logout),
    path('registration/', RegisterUserView.as_view()),
    path('is_authenticate/', is_authenticate),
    path('photo/', get_photo)
]
