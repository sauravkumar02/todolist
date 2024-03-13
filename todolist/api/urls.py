from django.urls import path, include
from rest_framework import routers
from .views import signup, login_view, TodoItemViewSet,echo_json

router = routers.DefaultRouter()
router.register(r'todos', TodoItemViewSet, basename='todoitem')

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('<int:user_id>/', include(router.urls)),
   path('echo/', echo_json, name='echo'),
]
