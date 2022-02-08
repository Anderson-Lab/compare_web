import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import tasks, job

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
         return JsonResponse({
            'success' : False,
            'job_id' : '',
            'error_message' : 'query and hit files were not detected on the post request'
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
            'error_message' : f'An exception was raised - {e.message}'
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
