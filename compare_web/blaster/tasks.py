# Create your tasks here

import os
from celery import shared_task
from django.conf import settings
from . import job
import json
import requests
import subprocess
import csv
import sys
import os
import time

@shared_task
def streamline(job_id):
    print('handling streamline job', job_id)
    streamline_job = job.Job(job_id)
    streamline_job.load()

    try:   
        streamline_job.started_status()
        fasta, genome, chromosome = streamline_job.get_streamline_files()
        print(f'using |{fasta}| |{genome}| |{chromosome}|')
        #TODO: need genome logic to switch genomes
        os.system("mkdir temp")
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar index --tmpLocation ./temp --database " + chromosome + "_database --reference chromosomes/"+ chromosome + ".fa.gz --enzyme spcas9ngg")
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar discover --database " + chromosome + "_database --fasta " + fasta + " --output flashfry.output --positionOutput")
        # do pipeline stuff
        f = open("flashfry.output", "r")
        f.readline()  # first line in file is header (unecessary)
        line = f.readline()
        track = "clinvarMain"
        # get rid of slashes
        chromosome = chromosome[1:]
        genome = genome[1:]
        output = []
        path = streamline_job.job_data_directory + "/" + streamline_job.job_id +"/output-json-dump.txt"
        write_file = open(path, 'w')
        counter = 0
        while counter < 1:
            line = line.split()
            start = line[1]
            end = line[2]
            diff = int(end) - int(start)
            offtargets = line[8].split(",")

            for offtarget in offtargets:
                # this gets start num and direction, direction not used
                pair = offtarget.split(":")[1].split("^")
                direction = pair[1][0]
                start = pair[0]
                end = str(int(start) + diff)
                api_url = "https://api.genome.ucsc.edu/getData/track?genome=" + genome + ";track=" + track + ";chrom=" + chromosome + ";start=" + start + ";end=" + end + ""
                time.sleep(0.5)
                # start uncomment block
                response = requests.get(api_url)
                output_dump = response.json()
                print(f'using |{api_url}| |{output_dump}|')
                mutations = output_dump["clinvarMain"]
                if mutations != []:
                    for mutation in mutations:
                        print("mutation: " + mutation["clinSign"])
                        print(json.dumps(mutation))
                        output.append(mutation)
                        write_file.write(json.dumps(mutation))
            # end uncomment block
            line = f.readline()
            counter += 1
        write_file.close()
        print('finished streamline job')
        streamline_job.completed_status()

    except Exception as e:
        streamline_job.error_status(f"Unexpected exception {e=}")
