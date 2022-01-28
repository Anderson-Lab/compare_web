import secrets
import time
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os

class Job:

   data_directory = settings.COMPARE_WEB_DATA_DIRECTORY

   query_filename = 'QUERY.fasta'
   hit_filename = 'HIT.fasta'

   def __init__(self):
      self.job_id = secrets.token_hex(32)
      self.created = time.time()

   def _job_directory(self):
      return Job.data_directory + '/' + self.job_id

   def create_directory(self):
      os.mkdir(self._job_directory())

   def save_files(self, query_file, hit_file):
      try:
         fs = FileSystemStorage(location=self._job_directory()) 
         fs.save(query_filename, query_file)
         fs.save(hit_filename, hit_file)

         return True
      except Exception as e:
         return False
