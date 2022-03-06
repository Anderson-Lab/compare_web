
import os
import re

from django.conf import settings

def DatabaseSort(db):
    return db['species']

class Fastas:

    available_databases = []
    scanned = False
    fasta_directory = settings.COMPARE_WEB_FASTA_DIRECTORY

    refseq_regex  = 'RefSeq_([A-Za-z]+)_(\d+)_(?:.*).fasta'
    uniprot_regex = 'UniProtKB_([A-Za-z]+)_([0-9_]+).fasta'

    def scan_fasta_directory(self):
        for _, _, files in os.walk(Fastas.fasta_directory):
            for file in files:
                if file.endswith('.fasta'):
                    self.add_fasta(file)

        Fastas.available_databases.sort(key=DatabaseSort)

    def add_fasta(self, file):
        refseq_match = re.search(Fastas.refseq_regex, file)
        uniprot_match = re.search(Fastas.uniprot_regex, file)
        if refseq_match is not None:
            species = refseq_match.group(1)
            version = refseq_match.group(2)

            print('found refseq fasta for species', species, 'version', version)

            Fastas.available_databases.append({
                'species' : species,
                'version' : version,
                'name' : f'{species} (RefSeq v.{version})',
                'filename' : file
            })
        elif uniprot_match is not None:
            species = uniprot_match.group(1)
            version = uniprot_match.group(2)

            print('found uniprot fasta for species', species, 'version', version)

            Fastas.available_databases.append({
                'species' : species,
                'version' : version,
                'name' : f'{species} (UniProt Ref Proteome v.{version})',
                'filename' : file
            })
        

    def get_databases(self):
        print('already scanned = ', Fastas.scanned)
        if not Fastas.scanned:
            self.scan_fasta_directory()
            Fastas.scanned = True
            print('finished scan')
        
        return Fastas.available_databases

    

