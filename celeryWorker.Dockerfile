FROM python:3 as celeryWorker

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# copy backend application
COPY compare_web/ /app/

# copy blast
COPY ncbi-blast-2.12.0+/ /usr/local/ncbi/blast/bin

# install pip requirements
RUN python -m pip install -r /app/requirements.txt

# application entry point
CMD ["celery", "-A", "compare_web", "worker", "-l", "INFO"]
