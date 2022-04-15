# Create your tasks here

from blaster.models import Widget
import os
from celery import shared_task
from django.conf import settings
from . import job
from .PAW_BLAST import db_to_db_blaster, make_subset_DB_from_list_3

# TODO: Need to link all of the user inputs stuff to the algorithm here
# Do some command line-y stuff here with flashfry
@shared_task
def blast(job_id):
    print('handling blast job', job_id)
    streamline_job = job.Job(job_id) 
    streamline_job.load()

    # try:    
    #     streamline_job.started_status()

    #     identifications, query, hit = streamline_job.get_blast_files()
    #     subset_file_name = streamline_job.get_subset_filename()

    #     print(f'using |{identifications}| |{query}| |{hit}|')

    #     # make the subset with the identifications and query fasta
    #     make_subset_DB_from_list_3.make_subset_db(identifications, query, subset_file_name)
    #     # blast the query subset against the target fasta
    #     db_to_db_blaster.db_blaster(settings.BLAST_PATH, subset_file_name, hit)

    #     print('finished blast job')
    #     streamline_job.completed_status()
    # except Exception as e:
    #     streamline_job.error_status(f"Unexpected exception {e=}")

    try:   
        streamline_job.started_status()
        identifications, genome, chromosome = streamline_job.get_blast_files()

        print(f'using |{identifications}| |{genome}| |{chromosome}|')

        os.system("mkdir temp")
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar index --tmpLocation ./tmp --database chr22_cas9ngg_database --reference chr22.fa.gz")
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar discover --database chr22_cas9ngg_database --fasta EMX1_GAGTCCGAGCAGAAGAAGAAGGG.fasta --output EMX1.output")

        # do pipeline stuff
        # take a look at db blaster stuff

        print('finished blast job')
        streamline_job.completed_status()

    except Exception as e:
        streamline_job.error_status(f"Unexpected exception {e=}")
