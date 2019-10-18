from django.contrib import admin
from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger', schema_view),
    path('api/auth', include('authentication.urls')),

    path('api/testing/', include('testing.urls')),

    path('api/admin/', include('administration.urls'))
]
