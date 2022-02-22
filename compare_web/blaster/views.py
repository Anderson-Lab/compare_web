from django.http import JsonResponse, FileResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles.views import serve
from . import tasks, job

# def index(request):
#    return render(request, 'static/index.html')

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
      job_id = request.POST['job_id']
      print('checking job', job_id)
      blast_job = job.Job(job_id)

      blast_job.load()

      return JsonResponse({
         'status' : blast_job.status,
         'message' : blast_job.message,
         'complete' : blast_job.complete,
         'success' : blast_job.success,
      })

   except Exception as e:
      print(e)
      return JsonResponse({
         'status' : "Unknown",
         'message' : e.message,
         'complete' : '',
         'success' : '',
      })

@csrf_exempt
def get_results(request, format='', job_id=''):
   print('getting results', format, job_id)

   try:
      blast_job = job.Job(job_id)

      identifications, query, hit = blast_job.get_blast_files()


      return FileResponse(open(identifications, 'rb'))

      # return serve(request, identifications)
   except Exception as e:
      print(e)
      return JsonResponse({
         'status' : "Unknown",
      })
   