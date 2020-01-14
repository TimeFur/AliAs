import os
from googletrans import Translator
from lxml import etree
from bs4 import BeautifulSoup
import requests

class ytVideoParser():

    def __init__(self, url):
        self.url = url
        
    def getInfo(self):
        return self._youtubeVideoInfo(self.url)

    def getTitle(self):
        return self._youtubeGetTitle(self.url)
    
    def _youtubeVideoInfo(self, url):
        requestUrl = url
        pattern = 'eow-description'
        
        #requesting url
        req = requests.get(requestUrl)

        #parsing
        soup = BeautifulSoup(req.text, 'html.parser')
        resultList = soup.find_all(id = pattern)
        result = resultList[0]
        
        return result

    def _youtubeGetTitle(self, url):
        requestUrl = url
        
        #requesting url
        req = requests.get(requestUrl)
        soup = BeautifulSoup(req.text, 'html.parser')
        
        return soup.title.string[:-9]
    
class VideoInfo():
    def __init__(self, selector):
        self.selector = selector
    
    def getInfoParser(self, url):
        if self.selector == "YOUTUBE":
            return ytVideoParser(url)
        else:
            raise ValueError(selector)

def storeHtml(soup):
    with open('r.txt', 'wb') as f:
        f.write(bytes(soup.text, encoding='utf8'))
'''
def main():
    videoObj = VideoInfo('YOUTUBE').getInfoParser('https://www.youtube.com/watch?v=Dm4dlfAdVv4')
    result = videoObj.getTitle()
    print (result)
    
if __name__ == "__main__":
    main()
'''
