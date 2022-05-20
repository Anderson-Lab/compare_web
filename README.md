# CRISPR Streamline

This application is a web hosted pipeline between [FlashFry](https://github.com/mckennalab/FlashFry) and the [UCSC Genome Browser API](https://genome.ucsc.edu/).

### Backend Application Request Flow
** For devs **

1. `/create_streamline_job`
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
   - Returns streamline results in either xml or txt

### Running

_Run docker compose up_
`docker-compose up -d --build`
