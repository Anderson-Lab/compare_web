
import os
import re

from django.conf import settings

class Fastas:

    available_databases = []
    scanned = False
    fasta_directory = settings.COMPARE_WEB_FASTA_DIRECTORY
    fasta_regex = 'RefSeq_([A-Za-z]+)_(\d+)_(?:.*).fasta'

    def scan_fasta_directory(self):
        for _, _, files in os.walk(Fastas.fasta_directory):
            for file in files:
                if file.endswith('.fasta'):
                    self.add_fasta(file)

    def add_fasta(self, file):
        match = re.search(Fastas.fasta_regex, file)
        if match is not None:
            species = match.group(1)
            version = match.group(2)

            print('found fasta for species', species, 'version', version)

            Fastas.available_databases.append({
                'species' : species,
                'version' : version,
                'filename' : file
            })

    def get_databases(self):
        print('already scanned = ', Fastas.scanned)
        if not Fastas.scanned:
            self.scan_fasta_directory()
            Fastas.scanned = True
            print('finished scan')
        
        return Fastas.available_databases

    

