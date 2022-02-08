# compare_web

This application is a web hosted port of the [PAW_BLASTER](https://github.com/pwilmart/PAW_BLAST) blast application.

### Backend Application Request Flow
** For devs **

1. `/create_blast_job`
   - Payload contains files to compare and `job_id`
   - Saves files under folder named `job_id`
   - Returns upload success and `job_id`
2. `/check_job`
   - Payload contains `job_id`
   - Returns job status
3. `/job_results`
   - Payload contains `job_id`
   - Returns job results

### Running

`docker run -d -p 5672:5672 --name rabbit rabbitmq`

*inside /compareweb dir*
`celery -A compare_web worker -l INFO`

`python manage.py runserver`