from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from . import tasks, job

def index(request):
   tasks.add.apply_async((1, 2))

   return HttpResponse("Hello, world. I've called a celery task")

@csrf_exempt
def upload(request):
    folder='/Users/augiedoebling/Desktop/' 
    # print(request.body)
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage(location=folder) #defaults to   MEDIA_ROOT  
        filename = fs.save(myfile.name, myfile)
        file_url = fs.url(filename)
        return HttpResponse("uploaded")
    else:
         return HttpResponse("no upload")


@csrf_exempt
def create_blast_job(request):
   # create job id
   blast_job = job.Job()
   
   # save files to job directory
   # blast_job.create_directory()
   # blast_job.save_files

   # create job status file 
   # queue job task
   
   
   # return success and job id
   return HttpResponse(blast_job.job_id)