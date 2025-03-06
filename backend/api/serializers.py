from rest_framework import serializers
from .models import Quadro

class QuadroSerializers(serializers.ModelSerializer):
    class Meta:
        model = Quadro
        fields = '__all__'