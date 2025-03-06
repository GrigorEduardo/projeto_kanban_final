
from django.contrib import admin
from django.urls import path
from .views import index, criar_quadro, delete_quadro, get_imagem_quadro

urlpatterns = [

    path('', index, name='quadro-list'),
    path('quadros/criar/', criar_quadro, name="criar_quadro"),
    path("quadros/delete/", delete_quadro, name="delete_quadro"),
    path('quadro/imagem/<str:quadro_nome>/', get_imagem_quadro, name='get_imagem_quadro'),
]
