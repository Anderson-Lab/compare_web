# front end build environment
FROM openjdk:16-alpine3.13

# setup flashfry
# download flashfry executable

RUN mkdir -p flashfry/tmp

RUN wget https://github.com/mckennalab/FlashFry/releases/download/1.12/FlashFry-assembly-1.12.jar

RUN mv FlashFry-assembly-1.12.jar /flashfry

#test that flashfry works properly, commented out b/c Docker builds FlashFry properly

# RUN wget https://raw.githubusercontent.com/aaronmck/FlashFry/master/test_data/quickstart_data.tar.gz

# RUN mv quickstart_data.tar.gz /flashfry

# RUN tar xf /flashfry/quickstart_data.tar.gz

# RUN java -Xmx4g -jar /flashfry/FlashFry-assembly-1.12.jar index --tmpLocation /flashfry/tmp --database chr22_cas9ngg_database --reference chr22.fa.gz --enzyme spcas9ngg

# RUN java -Xmx4g -jar /flashfry/FlashFry-assembly-1.12.jar discover --database chr22_cas9ngg_database --fasta EMX1_GAGTCCGAGCAGAAGAAGAAGGG.fasta --output EMX1.output

FROM python:3

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY compare_web/requirements.txt /app/
# install pip requirements
RUN python -m pip install -r /app/requirements.txt

# copy django app files
COPY compare_web/blaster /app/blaster
COPY compare_web/compare_web /app/compare_web
# with production settings
COPY compare_web/compare_web/settings_production.py /app/compare_web/settings.py

# application entry point
ENTRYPOINT celery -A compare_web worker --autoscale 10 --loglevel=info