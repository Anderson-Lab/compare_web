# Create your tasks here

from blaster.models import Widget
import os
from celery import shared_task
from django.conf import settings
from . import job
from .PAW_BLAST import db_to_db_blaster, make_subset_DB_from_list_3
import json
import requests
import subprocess
import csv
import sys
import os
import time

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
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar index --tmpLocation ./temp --database {genome} --reference {chromosome}")
        # output file format: contig start stop target context overflow orientation OTCount off-targets(remove everything after the underscore)
        os.system("java -Xmx4g -jar FlashFry-assembly-1.12.jar discover --database {genome} --fasta {identifications} --output flashfry.output") 

        # do pipeline stuff
        f = open("flashfry.output", "r")
        line = f.readline() # first line in file is header (unecessary)
        track = "clinvarMain"
        while line:
            line = f.readline()
            line = line.split()
            contig = line[0]
            start = line[1]
            end = line[2]
            # target = line[3]
            offtargets = line[8].split(",")[:-4]
            # EMX1_GAGTCCGAGCAGAAGAAGAAGGG	33	56	AGAGTCCGAGCAGAAGAAGAAGG	ATTGTGAGAGTCCGAGCAGAAGAAGAAGGGCTAGT	OK	FWD	8	ACTGTCCCAGCAGCAGAAGAGGG_1_4,AGAGGAGGAGGAGAAGAAGAAGG_1_4,AGAGGCCGGGAAGAAGAGGATGG_1_4,AGAGTCAGAGCAGTGGCAGATGG_1_4,AGAGTCAGGGCAGGAGAAAAGGG_1_4,AGAGTCCAGGCAGAAGGAGCAGG_1_4,AGAGTGAGAGGAGAAGAAGATGG_1_3,CGAGTCCGTGTAGAAGCAGAGGG_1_4
            track = "clinvarMain"
            ot_dict = {}
            #start = time.time()

            write_file = open('output-json-dump.txt', 'w')
            output = []
            counter = 0
            with open(output_file, newline='') as csvfile:
                reader = csv.reader(csvfile, delimiter = '\t')
                for row in reader:
                    if counter >= 10:
                        break
                    if row[0][0] == "#" or 'guide' in row[2]:  # ignore headers
                        pass
                    else:
                        offtarget = row[3]
                        chrom = row[8]
                        start = row[9]
                        end = row[10]
                        api_url = "https://api.genome.ucsc.edu/getData/track?genome=" + genome + ";track=" + track + ";chrom=" + chromosome + ";start=" + start + ";end=" + end + ""
                        response = requests.get(api_url)
                        output_dump = response.json()
                        try:
                            output_dump["statusCode"]
                        except:
                            if output_dump["clinvarMain"] != []:
                                for mutations in output_dump["clinvarMain"]:
                                    print(mutations)
                                    if mutations["clinSign"].lower().find("benign") != -1 or mutations["clinSign"].lower().find("uncertain") != -1:
                                        pass
                                    else:
                                        print(json.dumps(mutations))
                                        output.append(mutations)
                                        try:
                                            if ot_dict[offtarget] is None:
                                                print(output_dump)
                                            ot_dict[offtarget] = ot_dict[offtarget].append(mutations)
                                            counter += 1
                                        except:
                                            try:
                                                ot_dict[offtarget] = [mutations]
                                                counter += 1
                                            except:
                                                print(mutations)


        # take a look at db blaster stuff

        print('finished blast job')
        streamline_job.completed_status()

    except Exception as e:
        streamline_job.error_status(f"Unexpected exception {e=}")
