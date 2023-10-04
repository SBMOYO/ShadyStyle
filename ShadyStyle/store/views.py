from django.shortcuts import render
from .models import Sunglass

# Create your views here.
def index(request):
    sunglass = Sunglass.objects.all()
    return render(request, 'index.html',{'sunglass': sunglass})

def shop(request):
    apply_position_head = True
    return render(request, 'shop.html', {'apply_position_head': apply_position_head})

def about(request):
    apply_position_head = True
    return render(request, 'about.html',{'apply_position_head': apply_position_head})

def glasses(request):
    apply_position_head = True
    sunglass = Sunglass.objects.all()
    return render(request, 'glasses.html', {'sunglass': sunglass, 'apply_position_head': apply_position_head})

def contact(request):
    apply_position_head = True
    return render(request, 'contact.html', {'apply_position_head': apply_position_head})
