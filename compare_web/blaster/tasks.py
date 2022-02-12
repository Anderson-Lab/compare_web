# Create your tasks here

from blaster.models import Widget

from celery import shared_task
from django.conf import settings
from . import job
from .PAW_BLAST import db_to_db_blaster, make_subset_DB_from_list_3

@shared_task
def blast(job_id):
    print('handling blast job', job_id)
    blast_job = job.Job(job_id)
    blast_job.load()

    try:    
        blast_job.started_status()

        identifications, query, hit = blast_job.get_blast_files()
        subset_file_name = blast_job.get_subset_filename()

        print(f'using |{identifications}| |{query}| |{hit}|')

        # make the subset with the identifications and query fasta
        make_subset_DB_from_list_3.make_subset_db(identifications, query, subset_file_name)
        # blast the query subset against the target fasta
        db_to_db_blaster.db_blaster(settings.BLAST_PATH, subset_file_name, hit)

        # print('finished blast job')
        # blast_job.completed_status()
    except Exception as e:
        blast_job.error_status(e.message)
