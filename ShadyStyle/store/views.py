from django.shortcuts import render
from django.http import JsonResponse
from .models import Sunglass
from .serializers import SunglassSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView



# Create your views here.
def index(request):
    sunglass = Sunglass.objects.all()
    return render(request, 'index.html',{'sunglass': sunglass})

def cart(request):
    apply_position_head = True
    return render(request, 'cart.html', {'apply_position_head': apply_position_head})

def about(request):
    apply_position_head = True
    return render(request, 'about.html',{'apply_position_head': apply_position_head})

def glasses(request):
    apply_position_head = True
    sunglass = Sunglass.objects.all()
    return render(request, 'glasses.html', {'sunglass': sunglass, 'apply_position_head': apply_position_head})

@api_view(['GET', 'POST'])
def selected_sunglass_page(request, id):
    try: 
        sunglass = Sunglass.objects.get(pk=id)
    except Sunglass.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        return render(request, 'sunglass_detail.html', {'sunglass': sunglass, 'apply_position_head': True})


def contact(request):
    apply_position_head = True
    return render(request, 'contact.html', {'apply_position_head': apply_position_head})

@api_view(['GET'])
def add_to_cart(request, id):
    try:
        sunglass = Sunglass.objects.get(id=id)
    except Sunglass.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SunglassSerializer(sunglass)
        return Response(serializer.data)