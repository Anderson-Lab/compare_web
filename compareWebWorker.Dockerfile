# front end build environment
FROM python:3

RUN apt-get update
RUN apt-get install -y default-jre
RUN apt-get install -y rsync
RUN apt-get install -y vim-tiny
#RUN apt-get install -y python-dotenv
RUN pip install python-dotenv

WORKDIR /app

# setup flashfry
# download flashfry executable
RUN mkdir -p flashfry/tmp

RUN wget https://github.com/mckennalab/FlashFry/releases/download/1.12/FlashFry-assembly-1.12.jar

RUN mkdir chromosomes

WORKDIR /app/chromosomes
RUN rsync -avzP rsync://hgdownload.cse.ucsc.edu/goldenPath/hg19/chromosomes/ .

WORKDIR /app
RUN chmod a+rwx /app/

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

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