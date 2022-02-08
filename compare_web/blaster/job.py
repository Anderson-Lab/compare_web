import secrets
import time
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
import logging

class Job:

   logger = logging.getLogger(__name__)

   data_directory = settings.COMPARE_WEB_DATA_DIRECTORY

   query_filename = 'QUERY.fasta'
   hit_filename = 'HIT.fasta'

   status = ''
   message = ''
   success = False
   complete = False

   def __init__(self, id=None):
      self.job_id = secrets.token_hex(32) if id is None else id

   def _job_directory(self):
      return Job.data_directory + '/' + self.job_id

   def get_file_paths(self):
      dir = self._job_directory()
      return (dir+'/'+self.query_filename, dir+'/'+self.hit_filename)

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

   def save_files(self, query_file, hit_file):
      try:
         fs = FileSystemStorage(location=self._job_directory()) 
         fs.save(self.query_filename, query_file)
         fs.save(self.hit_filename, hit_file)

         return True
      except Exception as e:
         return False

   def _write_status(self):
      try:
         with open(self._job_directory() + '/status.txt', 'w+') as status_file:
            status_file.write(f'{self.status}\n')
            status_file.write(f'{self.success}\n')
            status_file.write(f'{self.complete}\n')
            status_file.write(f'{self.message}\n')
      except Exception as e:
         print('error writing status', e)
         pass

   def read_status(self):
      try:
         with open(self._job_directory() + '/status.txt', 'r') as status_file:
            self.status = status_file.readline()
            self.success = status_file.readline()
            self.complete = status_file.readline()
            self.message = status_file.readline()
      except Exception as e:
         pass

   
   def error_status(self, message):
      self.status = "Error"
      self.message = message
      self.success = False
      self.complete = True
      self._write_status()

   def queued_status(self):
      self.status = "Queued"
      self.message = "Blast is currently queued for run"
      self.success = True
      self.complete = False
      self._write_status()

   def started_status(self):
      self.status = "Running"
      self.message = "Blast is currently running"
      self.success = True
      self.complete = False
      self._write_status()

   def completed_status(self):
      self.status = "Complete"
      self.message = "Blast complete!"
      self.success = True
      self.complete = False
      self._write_status()

