from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import TestSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import TestModel
# Create your views here.


class TestView(ModelViewSet):
    serializer_class = TestSerializer
    queryset = TestModel.objects.all()

    class Meta:
        model = TestModel
        fields = ['user', 'message']


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        try:

            refresh_token = request.data["refresh_token"]

            token = RefreshToken(refresh_token)
            print(token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)

        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)
