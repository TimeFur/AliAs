from django.contrib import admin

# Register your models here.
from .models import PostImgList
from .models import PostUrl

admin.site.register(PostImgList)
admin.site.register(PostUrl)
