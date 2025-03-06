from django.shortcuts import render
from django.conf import settings

# Django Rest Framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Model
from .models import Quadro as QuadroModel

# serializers
from .serializers import QuadroSerializers


@api_view(['GET'])
def index(request):
    quadro = QuadroModel.objects.all()
    serialized_quadro = QuadroSerializers(quadro, many=True)
    return Response(serialized_quadro.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def filter_view(request, query):

    
    if not query:
        return Response({"detail": "Parâmetro de busca não informado."}, status=status.HTTP_400_BAD_REQUEST)

    quadro = QuadroModel.objects.filter(responsavel__icontains=query)

    if not quadro.exists():
        return Response({"detail": "Nenhum quadro encontrado."}, status=status.HTTP_404_NOT_FOUND)

    serialized_quadro = QuadroSerializers(quadro, many=True)
    return Response(serialized_quadro.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def criar_quadro(request):
    serializer = QuadroSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_quadro(request):
    # Verifica se o nome do quadro foi enviado no corpo da requisição
    quadro_nome = request.data.get('quadro', None)
    
    if not quadro_nome:
        return Response({"detail": "Nome do quadro não informado."}, status=status.HTTP_400_BAD_REQUEST)

    # Tenta encontrar o quadro pelo nome
    try:
        quadro = QuadroModel.objects.get(quadro=quadro_nome)
        quadro.delete()  # Exclui o quadro
        return Response({"message": "Quadro excluído com sucesso!"}, status=status.HTTP_200_OK)
    except QuadroModel.DoesNotExist:
        return Response({"detail": "Quadro não encontrado."}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def get_imagem_quadro(request, quadro_nome):
    try:
        # Tenta encontrar o quadro pelo nome
        quadro = QuadroModel.objects.get(quadro=quadro_nome)
        
        # Verifica se a imagem existe
        if not quadro.imagem:
            return Response({"detail": "Imagem não encontrada para este quadro."}, status=status.HTTP_404_NOT_FOUND)
        
        # Construa a URL da imagem
        imagem_url = f'{settings.MEDIA_URL}{quadro.imagem.name}'
        absolute_imagem_url = request.build_absolute_uri(imagem_url)
        print(absolute_imagem_url)
        return Response({
            "quadro": quadro.quadro,
            "imagem_url": absolute_imagem_url  # Retorna a URL da imagem
        }, status=status.HTTP_200_OK)
    
    except QuadroModel.DoesNotExist:
        return Response({"detail": "Quadro não encontrado."}, status=status.HTTP_404_NOT_FOUND)