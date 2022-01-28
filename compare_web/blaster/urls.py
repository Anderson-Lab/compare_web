from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload_file', views.upload, name='upload'),
    path('create_blast_job', views.create_blast_job, name='create_blast_job'),
]