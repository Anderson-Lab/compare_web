from django.shortcuts import render
from django.urls import path, re_path

from . import views

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    path('create_blast_job', views.create_blast_job, name='create_blast_job'),
    path('check_job_status', views.check_job_status, name='check_job_status'),
    path('results/<slug:format>/<slug:job_id>', views.get_results, name='get_results'),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]