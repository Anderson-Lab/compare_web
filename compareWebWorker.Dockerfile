# front end build environment
FROM python:3

# setup blast
# download blast executable
RUN curl https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/ncbi-blast-2.12.0+-x64-linux.tar.gz | tar xzf -
# RUN cd ncbi-blast-2.12.0+
RUN mkdir -p /usr/local/ncbi/blast/bin/
RUN mv /ncbi-blast-2.12.0+/bin/* /usr/local/ncbi/blast/bin/

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
