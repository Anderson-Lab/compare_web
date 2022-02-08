from django.urls import path

from . import views

urlpatterns = [
    path('create_blast_job', views.create_blast_job, name='create_blast_job'),
    path('check_job_status', views.check_job_status, name='check_job_status'),
]