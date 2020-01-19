from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import get_template
import base64
import os
import json

from .static.main.alg import translation
from .static.main.alg import videodownload
from .static.main.alg import videoInfoParse
# Create your views here.

POST_IMG_SRC_KEY = "imgSrc"
POST_VIDEOURL_SRC_KEY = "videoUrl"
POST_IMGDATA_KEY = 'IMGLIST_DATA'

def main_page(request):
    print ("AliAs main access")
    html_dict = {'title':'AliAs'}
    
    return render(request,
                   'main_page.html',
                   html_dict)

def search_page(request):
    html_dict = {'title':'AliAs'}
    search_target = ""
    resultTrans = ""
    
    if 'search_msg' in request.GET:
        search_target = request.GET['search_msg'] #get 'name'

    #call translation script
    tranObj = translation.Translation('CAMBRIDGE').getTrans()
    resultTrans = tranObj(search_target)
    print ("Trans result = " + resultTrans)
    
    return HttpResponse(resultTrans)

def searchVideo_page(request):

    videoId = "None"
    
    if 'searchVideo_ID' in request.GET:
        videoId = request.GET['videoID']

    print (videoId)

    return HttpResponse(search_target)

def changeToEdit(request):    
    title = 'EditPage'

    videoObj = videoInfoParse.VideoInfo('YOUTUBE').getInfoParser("https://www.youtube.com/watch?v=6ZZX9iIgFoo")
    videoTitle = videoObj.getTitle()
    videoInfo = videoObj.getInfo()
    
    #get img data from database
    template = get_template('editPage.html')
    html = template.render(locals())
    
    return HttpResponse(html)

@csrf_exempt
def sendToEditInfo(request):
    print ("Send to edit page")
    imgList = {}
    data = request.POST #QueryDict

    for key in request.POST:
        imgObject = request.POST[key]
        if key != 'videoUrl':
            imgObject = json.loads(request.POST[key])
            print (key, imgObject['curtime'])
            print (key, imgObject['text'])
            #print (key, imgObject['src'])
        else:
            print (key, imgObject)

    return HttpResponse("DONE")

@csrf_exempt
def videoDownload(request):
    url = ''
    if POST_VIDEOURL_SRC_KEY in request.POST:
        url = request.POST[POST_VIDEOURL_SRC_KEY]

        print ("Download url  = " + url)
        videoObj = videodownload.DownloadObj()
        videoObj.download(url)
        
    return HttpResponse("OK")

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
def imgSearch(request):
    status = "None"

    if POST_IMG_SRC_KEY in request.POST:
        status = "Get imgSearch!"
        
        img_data = request.POST[POST_IMG_SRC_KEY]
        
        print ("imgSearch get!! ")
        
    return HttpResponse(status)

@csrf_exempt
def get_VideoUrl(request):
    videoUrl = "https://www.youtube.com/embed/"
    
    if POST_VIDEOURL_SRC_KEY in request.POST:
        url = request.POST[POST_VIDEOURL_SRC_KEY]

        #setting youtube url as embed type
        start = url.find('v=') + 2
        end = -1
        if url.find('&') > 0:
            end = url.find('&')
            videoUrl = videoUrl + url[start:end]
        else:
            videoUrl = videoUrl + url[start:]
        print (videoUrl)

        #parsing title
        videoObj = videoInfoParse.VideoInfo('YOUTUBE').getInfoParser(url)
        title = videoObj.getTitle()
        print (title)

        data ={'videoUrl': videoUrl,
               'videoTitle': title}
        
    return JsonResponse(data)
