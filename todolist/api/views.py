from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework import viewsets
from .models import TodoItem,EchoItem
from .serializers import TodoItemSerializer,EchoItemSerializer
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TodoItem
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.decorators import action



@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        fullname = serializer.validated_data['fullname']
        
        user = User.objects.create_user(username=email, email=email, password=password, first_name=fullname)
        user.save()
        
        return Response({'message': 'User created successfully'})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        user_id = user.id
        fullname = user.get_full_name()
        return Response({'message': 'Login successful', 'token': token.key, 'user_id': user_id, 'fullname': fullname})
    
    return Response({'message': 'Invalid credentials'}, status=400)



class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return self.queryset.filter(user_id=user_id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['put'])
    def update_todo_item(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)    


@api_view(['GET', 'POST', 'DELETE'])
def echo_json(request, pk=None):
    if pk is not None:
        if request.method == 'GET':
            echo_item = get_object_or_404(EchoItem, pk=pk)
            serializer = EchoItemSerializer(echo_item)
            return Response(serializer.data)

        if request.method == 'DELETE':
            echo_item = get_object_or_404(EchoItem, pk=pk)
            echo_item.delete()
            return Response({'message': 'Item deleted successfully'}, status=204)

    if request.method == 'GET' and request.path == '/api/v1/echo/':
        queryset = EchoItem.objects.all()
        serializer = EchoItemSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == 'POST' and request.path == '/api/v1/echo/':
        serializer = EchoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    return Response({'message': 'Method not allowed'}, status=405)



