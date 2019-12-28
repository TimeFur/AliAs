from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import base64
import os
# Create your views here.

POST_IMG_SRC_KEY = "imgSrc"
POST_VIDEOURL_SRC_KEY = "videoUrl"

def main_page(request):
    print ("AliAs main access")
    html_dict = {'title':'AliAs'}
    
    return render(request,
                   'main_page.html',
                   html_dict)

def search_page(request):
    html_dict = {'title':'AliAs'}
    search_target = ""
    #get search text
    
    if 'search_msg' in request.GET:
        search_target = request.GET['search_msg'] #get 'name'
    print ("search target = " + search_target)
    
    #get search result
    #decorate view
    #return HttpResponse(search_target)
    return HttpResponse(search_target)
    '''
    return render(request,
                   'main/main_page.html',
                   html_dict
                   )
    '''
def searchVideo_page(request):

    videoId = "None"
    
    if 'searchVideo_ID' in request.GET:
        videoId = request.GET['videoID']

    print (videoId)

    return HttpResponse(search_target)

@csrf_exempt
def get_imgSrc(request):
    status = "None"

    if POST_IMG_SRC_KEY in request.POST:
        status = "Get img source!"
        
        img_data = request.POST[POST_IMG_SRC_KEY]

        with open("screenshot.jpg", 'wb') as f:
            img_data = img_data[img_data.find(',') + 1:]
            img_data_bytes = bytes(img_data, encoding = 'utf-8')
            imgSrcRawData = base64.decodebytes(img_data_bytes)
            
            f.write(imgSrcRawData)
        
        #print ("ImgSrc get = " + request.POST[POST_IMG_SRC_KEY])
        
    return HttpResponse(status)

@csrf_exempt
def get_VideoUrl(request):
    videoUrl = "https://www.youtube.com/embed/"
    
    if POST_VIDEOURL_SRC_KEY in request.POST:
        url = request.POST[POST_VIDEOURL_SRC_KEY]
        start = url.find('v=') + 2
        end = -1
        if url.find('&') > 0:
            end = url.find('&')
            videoUrl = videoUrl + url[start:end]
        else:
            videoUrl = videoUrl + url[start:]
        print (videoUrl)
        
    return HttpResponse(videoUrl)
