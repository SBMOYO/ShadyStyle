from rest_framework import serializers
from .models import Sunglass, Cart

class SunglassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sunglass
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'