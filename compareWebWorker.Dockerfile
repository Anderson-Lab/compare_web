# front end build environment
FROM python:3

# setup flashfry
# download flashfry executable
RUN apt-get update
#RUN apt-get install -y software-properties-common
#RUN add-apt-repository ppa:webupd8team/java
#RUN apt-get update
#
#RUN apt-get install oracle-java8-installer
#RUN apt-get install openjdk-8-jdk
RUN apt-get install -y default-jre
RUN apt-get install -y rsync
RUN apt-get install -y vim-tiny

WORKDIR /app

RUN mkdir -p flashfry/tmp

RUN wget https://github.com/mckennalab/FlashFry/releases/download/1.12/FlashFry-assembly-1.12.jar

RUN mkdir chromosomes

WORKDIR /app/chromosomes
RUN rsync -avzP rsync://hgdownload.cse.ucsc.edu/goldenPath/hg19/chromosomes/ .

WORKDIR /app
RUN chmod a+rwx /app/

# RUN mv FlashFry-assembly-1.12.jar /flashfry

#test that flashfry works properly, commented out b/c Docker builds FlashFry properly

# RUN wget https://raw.githubusercontent.com/aaronmck/FlashFry/master/test_data/quickstart_data.tar.gz

# RUN mv quickstart_data.tar.gz /flashfry

# RUN tar xf /flashfry/quickstart_data.tar.gz

# RUN java -Xmx4g -jar /flashfry/FlashFry-assembly-1.12.jar index --tmpLocation /flashfry/tmp --database chr22_cas9ngg_database --reference chr22.fa.gz --enzyme spcas9ngg

# RUN java -Xmx4g -jar /flashfry/FlashFry-assembly-1.12.jar discover --database chr22_cas9ngg_database --fasta EMX1_GAGTCCGAGCAGAAGAAGAAGGG.fasta --output EMX1.output

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

#WORKDIR /app

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