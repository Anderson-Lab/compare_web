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

# TODO: Need to link all of the user inputs stuff to the algorithm here

@shared_task
def streamline(job_id):
    print('handling streamline job', job_id)
    streamline_job = job.Job(job_id)
    streamline_job.load()

    try:   
        streamline_job.started_status()
        fasta, genome, chromosome = streamline_job.get_blast_files()

        print(f'using |{fasta}| |{genome}| |{chromosome}|')

        os.system("mkdir temp")
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar index --tmpLocation ./temp --database chr22_database --reference chromosomes/chr22.fa.gz --enzyme spcas9ngg")
        # output file format: contig start stop target context overflow orientation OTCount off-targets(remove everything after the underscore)
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar discover --database chr22_database --fasta " + fasta + " --output flashfry.output --positionOutput")
        # do pipeline stuff
        f = open("flashfry.output", "r")
        f.readline()  # first line in file is header (unecessary)
        line = f.readline()
        track = "clinvarMain"
        while line:
            line = line.split()
            contig = line[0]
            start = line[1]
            end = line[2]
            # target = line[3]
            offtargets = line[8].split(",")[:-4]
            # EMX1_GAGTCCGAGCAGAAGAAGAAGGG	33	56	AGAGTCCGAGCAGAAGAAGAAGG	ATTGTGAGAGTCCGAGCAGAAGAAGAAGGGCTAGT	OK	FWD	8	ACTGTCCCAGCAGCAGAAGAGGG_1_4,AGAGGAGGAGGAGAAGAAGAAGG_1_4,AGAGGCCGGGAAGAAGAGGATGG_1_4,AGAGTCAGAGCAGTGGCAGATGG_1_4,AGAGTCAGGGCAGGAGAAAAGGG_1_4,AGAGTCCAGGCAGAAGGAGCAGG_1_4,AGAGTGAGAGGAGAAGAAGATGG_1_3,CGAGTCCGTGTAGAAGCAGAGGG_1_4
            track = "clinvarMain"
            ot_dict = {}
            # start = time.time()

            write_file = open('output-json-dump.txt', 'w+')
            output = []
            # counter = 0
            print("start: ", start)
            print("end: ", end)
            api_url = "https://api.genome.ucsc.edu/getData/track?genome=" + "hg19" + ";track=" + track + ";chrom=" + "chr22" + ";start=" + start + ";end=" + end + ""
            print(api_url)
            response = requests.get(api_url)
            output_dump = response.json()
            print(output_dump)
            try:
                output_dump["statusCode"]
            except:
                if output_dump["clinvarMain"] != []:
                    for mutations in output_dump["clinvarMain"]:
                        print(mutations)
                        if mutations["clinSign"].lower().find("benign") != -1 or mutations["clinSign"].lower().find(
                                "uncertain") != -1:
                            pass
                        else:
                            print(json.dumps(mutations))
                            output.append(mutations)
            line = f.readline()
                            # try:
                            #     if ot_dict[offtarget] is None:
                            #         print(output_dump)
                            #     ot_dict[offtarget] = ot_dict[offtarget].append(mutations)
                            #     counter += 1
                            # except:
                            #     try:
                            #         ot_dict[offtarget] = [mutations]
                            #         counter += 1
                            #     except:
                            #         print(mutations)


        # take a look at db blaster stuff

        print('finished blast job')
        streamline_job.completed_status()

    except Exception as e:
        streamline_job.error_status(f"Unexpected exception {e=}")
