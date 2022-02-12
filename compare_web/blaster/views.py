import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import tasks, job

@csrf_exempt
def create_blast_job(request):
   try:

      if request.method == 'POST' and 'identificationsFile' in request.FILES:
         # create job id
         blast_job = job.Job()
         
         # save files to job directory
         blast_job.create_directory()
         # todo: validate files
         # set which databse files to use
         blast_job.set_database_files(request.POST['queryDatabase'], request.POST['hitDatabase'])
         # save the identification file
         blast_job.save_identifications_file(request.FILES['identificationsFile'])
         
         # queue job task
         tasks.blast.apply_async(args=[blast_job.job_id])
         blast_job.queued_status()

      else :
         return JsonResponse({
            'success' : False,
            'job_id' : '',
            'error_message' : 'identification file was not detected on the post request'
         })


      # return success and job id
      return JsonResponse({
            'success' : True,
            'job_id' : blast_job.job_id,
            'error_message' : ''
         })
   except Exception as e:
      return JsonResponse({
            'success' : False,
            'job_id' : '',
            'error_message' : f'An exception was raised - {e}'
         })


@csrf_exempt
def check_job_status(request):
   try:
      blast_job = job.Job(request.job_id)

      blast_job.read_status()

      return JsonResponse({
         'status' : blast_job.status,
         'message' : blast_job.message,
         'complete' : blast_job.complete,
         'success' : blast_job.success,
      })

   except Exception as e:
      return JsonResponse({
         'status' : "Unknown",
         'message' : e.message,
         'complete' : '',
         'success' : '',
      })
