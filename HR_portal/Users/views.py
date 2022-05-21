from django.http import FileResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

from .models import CustomUser
from .serilizer import LoginSerializer, UserRegisterSerializer
from Users.models import CustomUser
from portal.models import Worker, Vacancy


class RegisterUserView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'Success'}, status=status.HTTP_200_OK)
        else:
            data = serializer.errors
            return Response(data)


class LoginApiView(APIView):
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request: Request):
        """
        Авторизация по username и password
        Args:
            request:

        Returns:

        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            authenticated_user = authenticate(**serializer.validated_data)
            if authenticated_user is not None:
                login(request, authenticated_user)
                return Response({'status': 'Success'})
            else:
                return Response({'error': 'Invalid credentials'}, status=403)
        else:
            return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def user_logout(request):
    """
    Выход пользователя из системы
    Args:
        request:
    Returns:
    """
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view()
def is_authenticate(request):
    return Response({'is_authenticated': request.user.is_authenticated})


@api_view(['POST'])
def load_photo(request):
    user = CustomUser.objects.get(request.user.id)


@api_view(['GET'])
def get_photo(request):
    # param 0 - user, param 1 - работник, param 2 - работадатель
    param = int(request.GET.get('param'))
    photo = None
    if param == 0:
        user: CustomUser = CustomUser.objects.get(pk=request.user.id)
        photo = user.photo
    if param == 1:
        resume_id = int(request.GET.get('resume'))
        worker = Worker.objects.get(resume_id=resume_id)
        photo = worker.user.photo
    if param == 2:
        vacancy_id = int(request.GET.get('vacancy'))
        vac = Vacancy.objects.get(pk=vacancy_id)
        photo = vac.author.user.photo

    if photo:
        return FileResponse(open(f'media\\{photo.name}', 'rb'))
    else:
        return FileResponse(open('media\\photos\\test.jpg', 'rb'))
