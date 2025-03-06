from django.db import models

# Create your models here.

class Quadro(models.Model):

    quadro = models.CharField('Quadro', max_length=255, null=False, blank=False)
    responsavel = models.CharField('Responsavel',max_length=255, null=False, blank=False)
    empresa = models.CharField('Empresa',max_length=255, null=False, blank=False)
    status = models.FloatField('Status')
    data = models.DateField('Data entrega')
    imagem = models.FileField('Imagem', upload_to='imagens', null=True, blank=True)