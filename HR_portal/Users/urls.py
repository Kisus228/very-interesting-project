from django.urls import path
from .views import LoginApiView, user_logout


urlpatterns = [
    path('login/', LoginApiView.as_view()),
    path('logout/', user_logout),
]
