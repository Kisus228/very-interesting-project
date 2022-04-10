from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serilizer import LoginRequestSerializer


class LoginApiView(APIView):
    queryset = CustomUser.objects.all()
    serializer_class = LoginRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request: Request):
        serializer = LoginRequestSerializer(data=request.data)
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
