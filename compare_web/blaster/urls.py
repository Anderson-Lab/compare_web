from django.urls import path

from . import views

urlpatterns = [
    path('upload_file', views.upload, name='upload'),
    path('create_blast_job', views.create_blast_job, name='create_blast_job'),
]