import os
from googletrans import Translator
from lxml import etree
from bs4 import BeautifulSoup
import requests

class VideoInfo():
    def __init__(self, selector):
        self.selector = selector
    
    def getInfoParser(self):
        if self.selector == "YOUTUBE":
            return self._youtubeVideoInfo
        else:
            raise ValueError(selector)

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
'''
def main():
    videoObj = VideoInfo('YOUTUBE').getInfoParser()
    videoObj('https://www.youtube.com/watch?v=Dm4dlfAdVv4')
    
if __name__ == "__main__":
    main()
'''
