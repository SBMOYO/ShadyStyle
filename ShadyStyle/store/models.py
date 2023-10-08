from django.db import models

# Create your models here.
class Sunglass(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    description = models.TextField(max_length=500, default=f'this is a {name}')
    img = models.ImageField(upload_to='media/pics')

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    sunglass = models.ForeignKey(Sunglass, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.sunglass.name} - {self.quantity}'