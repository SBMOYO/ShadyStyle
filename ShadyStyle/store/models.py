from django.db import models

# Create your models here.
class Sunglass(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    img = models.ImageField(upload_to='media/pics')

    def __str__(self):
        return self.name