# compare_web

This is the code for the MasterBlaster website

Information:
The website is hosted on a node.js backend and a react.js frontend. This functionality of the webstite is to create an easy, GUI less way to use Phillip Wilmarth's PAW_BLAST program which is a utility for blasting one protein FASTA file (queries) against another (hits) to find orthologs (reciprocal best matches). Link to find source code to Phillip Wilmarth's PAW_BLAST program https://github.com/pwilmart/PAW_BLAST.

How to run code:
1) cd into /Server
2) use "npm install"
3) cd into /client
4) use "npm install"
5) cd into /Server
6) use "npm run dev"

react server is run on localhost:3000
node server is run on localhost:5000

# Backlog
- Uploaded files are never removed from server. Need to create a way to create expiration date.
- Annotation script (add_protein_annotations_6.py) is not run. only make subset FASTA database (make_subset_DB_from_list_3.py) and BLAST ortholog script (db_to_db_blaster.py) is run. Ran into an error when running the Annotation script.
- Display more information of results file on webpage. Currently only has a button to download the results file.
- Host on a dedicated server
- Add a administrative way to add more provided files onto server.

