import re
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from . import tasks, job
import json

# def index(request):
#    tasks.add.apply_async((1, 2))

   # return HttpResponse("Hello, world. I've called a celery task")

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
   try:

      # if request.method == 'POST' and request.FILES['queryFile'] and request.FILES['hitFile']:
      if request.method == 'POST' and 'queryFile' in request.FILES and 'hitFile' in request.FILES:
         # create job id
         blast_job = job.Job()
         
         # save files to job directory
         blast_job.create_directory()
         # todo: validate files
         blast_job.save_files(request.FILES['queryFile'], request.FILES['hitFile'])
         
         # queue job task
         query, hit = blast_job.get_file_paths()
         tasks.blast.apply_async(args=[blast_job.job_id, query, hit])
         blast_job.queued_status()

      else :
         return HttpResponseBadRequest("query and hit files were not detected on the post request")


      # return success and job id
      return HttpResponse(blast_job.job_id)
   except Exception as e:
      raise


@csrf_exempt
def check_job_status(request):
   try:
      blast_job = job.Job(request.job_id)

      blast_job.read_status()

      return HttpResponse(json.dumps({
         'status' : blast_job.status,
         'message' : blast_job.message,
         'complete' : blast_job.complete,
         'success' : blast_job.success,
      }))


   except Exception as e:
      raise

   