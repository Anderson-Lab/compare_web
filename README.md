# compare_web

This application is a web hosted port of the [PAW_BLASTER](https://github.com/pwilmart/PAW_BLAST) blast application.

### Backend Application Request Flow
** For devs **

1. `/create_blast_job`
   - Payload contains identification file
   - Saves files under folder named `job_id`
   - Returns upload success and `job_id`
2. `/check_job_status`
   - Payload contains `job_id`
   - Returns job status1
2. `/available_databases`
   - Returns list of available fasta databases to blast with
3. `/results/<format>/<job_id>`
   - Payload contains `job_id`
   - Returns blast results in either xml or txt

### Running

`docker-compose -d up`
