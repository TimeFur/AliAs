from django.db import models

# Create your models here.
class PostImgList(models.Model):
    title = models.CharField(max_length = 100)
    videoId = models.CharField(max_length = 100, default='')
    content = models.TextField(blank=True)
    curtime = models.CharField(max_length = 100)
    imgsrc = models.ImageField(upload_to = 'photo/') #subdirectory of MEDIA_ROOT to use for uploaded files

    def __str__(self):
        return self.title
    
class PostUrl(models.Model):
    url = models.CharField(max_length = 100)
    postimglist = models.ForeignKey('PostImgList',
                                     blank = True,
                                     null = True,
                                     on_delete=models.SET_NULL)

    def __str__(self):
        return self.url
