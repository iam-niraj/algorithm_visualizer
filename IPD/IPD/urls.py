
from django.contrib import admin
from django.urls import include, path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('createAST/',views.format_code),
    path('',include('api.urls'))
]
