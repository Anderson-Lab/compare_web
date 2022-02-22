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

   query_filename = ''
   hit_filename = ''

   identifications_filename = 'identificiations.txt'
   subset_filename = 'subset.fasta'

   status = ''
   message = ''
   success = False
   complete = False

   def __init__(self, id=None):
      self.job_id = secrets.token_hex(32) if id is None else id

   def _job_directory(self):
      return Job.job_data_directory + '/' + self.job_id

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

   def save_identifications_file(self, identifications_file):
      try:
         fs = FileSystemStorage(location=self._job_directory()) 
         fs.save(self.identifications_filename, identifications_file)
         return True
      except Exception as e:
         return False

   def set_database_files(self, query, hit):
      self.query_filename = query
      self.hit_filename = hit

   def get_blast_files(self):
      identifications = self._job_directory() + '/' + Job.identifications_filename
      query = Job.fasta_directory+'/'+self.query_filename
      hit = Job.fasta_directory+'/'+self.hit_filename

      return (identifications, query, hit)

   def get_subset_filename(self):
      return self._job_directory() + '/' + Job.subset_filename


   def get_results_file(self, format='xml'):
      if format == 'xml':
         re_file_pattern = 'subset_vs_.*.xml'
      elif format == 'txt':
         re_file_pattern = 'subset_vs_.*.txt'

      dir = self._job_directory()
      for _, _, files in os.walk(dir):
         for file in files:
            if re.match(re_file_pattern, file):
               return dir + '/' +file

   def save(self):
      try:
         with open(self._job_directory() + '/status.txt', 'wb+') as status_file:
            status = {
               'query_filename': self.query_filename,
               'hit_filename': self.hit_filename,
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
            self.query_filename = loaded['query_filename']
            self.hit_filename = loaded['hit_filename']
            self.status = loaded['status']
            self.message = loaded['message']
            self.success = loaded['success']
            self.complete = loaded['complete']

      except Exception as e:
         print('error loading status', e)

   
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

