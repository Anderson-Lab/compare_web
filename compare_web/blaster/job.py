import pickle
import secrets
import time
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
import logging
import re

class Job:

   logger = logging.getLogger(__name__)

   job_data_directory = settings.COMPARE_WEB_DATA_DIRECTORY
   fasta_directory = settings.COMPARE_WEB_FASTA_DIRECTORY

   genome_filename = ''
   chromosome_filename = ''

   identifications_filename = 'fastaFile.fasta'
   subset_filename = 'subset.fasta'

   status = ''
   message = ''
   success = False
   complete = False

   # Generate a job ID
   def __init__(self, id=None):
      self.job_id = secrets.token_hex(32) if id is None else id

   # Generate a path for a job directory
   def _job_directory(self):
      return Job.job_data_directory + '/' + self.job_id

   # Create a directory to hold the files related to a job
   def create_directory(self):
      directory = self._job_directory()
      self.logger.debug(f'creating directory for job {self.job_id} at {directory}')

      if os.path.exists(directory):
         self.logger.warning(f'directory at {directory} already exists')

      try:
         os.mkdir(directory)
      except Exception as e:
         logging.exception(f'Could not create directory at {directory}')
         raise

   # Save the uploaded file to the directory with all the job files
   def save_identifications_file(self, identifications_file):
      try:
         fs = FileSystemStorage(location=self._job_directory()) 
         fs.save(self.identifications_filename, identifications_file)
         print("save_identifications file "+self._job_directory())
         return True
      except Exception as e:
         return False

   # Set database files in directory
   def set_database_files(self, genome, chromosome):
      self.genome_filename = genome
      self.chromosome_filename = chromosome

   # getter to access all user inputed data
   def get_blast_files(self):
      identifications = self._job_directory() + '/' + Job.identifications_filename
      genome = Job.fasta_directory+'/'+self.genome_filename
      chromosome = Job.fasta_directory+'/'+self.chromosome_filename
      print("identification "+identifications)
      return (identifications, genome, chromosome)

   # TODO: Maybe remove this.
   def get_subset_filename(self):
      return self._job_directory() + '/' + Job.subset_filename


   # Actual results file after algorithm is run
   def get_results_file(self, format='xml'):
      if format == 'xml':
         re_file_pattern = 'subset_vs_.*.xml'
      elif format == 'txt':
         re_file_pattern = 'subset_vs_.*.txt'
      elif format == 'xlsx':
         re_file_pattern = 'subset_vs_.*.txt' # we'll fix this later

      dir = self._job_directory()
      for _, _, files in os.walk(dir):
         for file in files:
            if re.match(re_file_pattern, file):
               if format == 'xlsx':
                  import pandas as pd
                  df = pd.read_csv(dir + '/' +file, skiprows=5, sep="\t", engine ='python', error_bad_lines=False)
                  file = file.replace(".txt",".xlsx")
                  df.to_excel(dir + '/' + file,index=False)
               return dir + '/' +file

   # Save all the inputted files to directory
   def save(self):
      try:
         with open(self._job_directory() + '/status.txt', 'wb+') as status_file:
            status = {
               'genome_filename': self.genome_filename,
               'chromosome_filename': self.chromosome_filename,
               'status': self.status,
               'message': self.message,
               'success': self.success,
               'complete': self.complete,
            }

            pickle.dump(status, status_file)
      except Exception as e:
         print('error writing status', e)

   def load(self):
      try:
         with open(self._job_directory() + '/status.txt', 'rb') as status_file:
            loaded = pickle.load(status_file)
            # print('loaded', loaded)
            self.genome_filename = loaded['genome_filename']
            self.chromosome_filename = loaded['chromosome_filename']
            self.status = loaded['status']
            self.message = loaded['message']
            self.success = loaded['success']
            self.complete = loaded['complete']

      except Exception as e:
         print('error loading status', e)

   # STATUSES OF JOBS
   def error_status(self, message):
      self.status = "Error"
      self.message = message
      self.success = False
      self.complete = True
      self.save()

   def queued_status(self):
      self.status = "Queued"
      self.message = "Blast is currently queued for run"
      self.success = True
      self.complete = False
      self.save()

   def started_status(self):
      self.status = "Running"
      self.message = "Blast is currently running"
      self.success = True
      self.complete = False
      self.save()

   def completed_status(self):
      self.status = "Complete"
      self.message = "Blast complete!"
      self.success = True
      self.complete = True
      self.save()

