from django.urls import path, include
from rest_framework import routers
from .views import signup, login_view, TodoItemViewSet,echo_json
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'todos', TodoItemViewSet, basename='todoitem')

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('<int:user_id>/', include(router.urls)),
   path('echo/', echo_json, name='echo'),
]
# urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)