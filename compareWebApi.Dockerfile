# front end build environment
FROM python:3 as compare_web

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY compare_web/requirements.txt /app/
# install pip requirements
RUN python -m pip install -r /app/requirements.txt

# copy django application
#COPY compare_web/ /app
# overwrite settings file with prodcution settings file
#COPY compare_web/compare_web/settings_production.py /app/compare_web/settings.py

# application entry point
CMD [ "python", "./manage.py", "runserver", "0.0.0.0:80"] 