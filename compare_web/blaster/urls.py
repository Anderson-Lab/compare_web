import re
from django.shortcuts import render
from django.urls import path, re_path

from . import views

urlpatterns = [
    path('crisprstreamlineapi/create_streamline_job', views.create_streamline_job, name='create_streamline_job'),
    path('crisprstreamlineapi/check_job_status', views.check_job_status, name='check_job_status'),
    path('crisprstreamlineapi/available_databases', views.available_databases, name='available_databases'),
    path('crisprstreamlineapi/results/<slug:format>/<slug:job_id>', views.get_results, name='get_results'),
]