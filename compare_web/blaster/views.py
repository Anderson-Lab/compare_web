from django.http import HttpResponse
from . import tasks

def index(request):
   tasks.add.apply_async((1, 2))

   return HttpResponse("Hello, world. I've called a celery task")