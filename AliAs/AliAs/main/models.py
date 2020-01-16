from django.db import models

# Create your models here.
class PostImgList(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField(blank=True)
    curtime = models.CharField(max_length = 100)
    imgsrc = models.ImageField(upload_to = 'photo/') #subdirectory of MEDIA_ROOT to use for uploaded files
