from inspect import trace
from django.http import JsonResponse, FileResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from blaster.fastas import Fastas
from . import tasks, job
import traceback

# def index(request):
#    return render(request, 'static/index.html')

@csrf_exempt
def create_streamline_job(request):
   try:

      if request.method == 'POST' and 'fastaFile' in request.FILES:
         # create job id
         streamline_job = job.Job()
         
         # save files to job directory
         streamline_job.create_directory()
         # todo: validate files
         # set which databse files to use
         streamline_job.set_database_files(request.POST['referenceGenome'], request.POST['referenceChromosome'])
         # save the identification file
         streamline_job.save_identifications_file(request.FILES['fastaFile'])
         
         # queue job task
         tasks.blast.apply_async(args=[streamline_job.job_id])
         streamline_job.queued_status()

      else :
         return JsonResponse({
            'success' : False,
            'job_id' : '',
            'error_message' : 'identification file was not detected on the post request'
         })


      # return success and job id
      return JsonResponse({
            'success' : True,
            'job_id' : streamline_job.job_id,
            'error_message' : ''
         })
   except Exception as e:
      print(traceback.format_exc())
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
      streamline_job = job.Job(job_id)

      streamline_job.load()

      return JsonResponse({
         'status' : streamline_job.status,
         'message' : streamline_job.message,
         'complete' : streamline_job.complete,
         'success' : streamline_job.success,
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
def available_databases(request):
   print('getting databases')

   try:
      fastas = Fastas()
      databases = fastas.get_databases() # get genome and chromosome

      return JsonResponse({
         'databases' : databases
      })
   except Exception as e:
      print(e)
      return JsonResponse({
         'databases' : [],
      })

@csrf_exempt
def get_results(request, format='', job_id=''):
   print('getting results', format, job_id)

   try:
      streamline_job = job.Job(job_id)

      results = streamline_job.get_results_file(format)
      print('results file at', results)


      response = FileResponse(open(results, 'rb'))

      response.headers['Content-Type'] = 'application/force-download'

      return response
   except Exception as e:
      print(e)
      return JsonResponse({
         'status' : "Unknown",
      })
   