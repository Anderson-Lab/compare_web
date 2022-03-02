import re
from django.shortcuts import render
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('masterblasterapi/create_blast_job', views.create_blast_job, name='create_blast_job'),
    path('masterblasterapi/check_job_status', views.check_job_status, name='check_job_status'),
    path('masterblasterapi/available_databases', views.available_databases, name='available_databases'),
    path('masterblasterapi/results/<slug:format>/<slug:job_id>', views.get_results, name='get_results'),
]