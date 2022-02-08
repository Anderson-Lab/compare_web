# Create your tasks here

from blaster.models import Widget

from celery import shared_task
from django.conf import settings
from . import db_to_db_blaster, job

@shared_task
def blast(job_id, query_file, hit_file):
    print('handling blast job', job_id)
    blast_job = job.Job(job_id)

    try:    
        blast_job.started_status()
        # query, hit = blast_job.get_file_paths()
        db_to_db_blaster.db_blaster(settings.BLAST_PATH, query_file, hit_file)
        print('finished blast job')
        blast_job.completed_status()
    except Exception as e:
        blast_job.error_status(e.message)
