from rest_framework import serializers
from .models import TodoItem,EchoItem

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    fullname = serializers.CharField()


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'

class EchoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EchoItem
        fields = '__all__'