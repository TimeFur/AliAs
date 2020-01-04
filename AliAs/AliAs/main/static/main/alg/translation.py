import os
from googletrans import Translator
from lxml import etree
from bs4 import BeautifulSoup
import requests

class Translation():
    def __init__(self, selector):
        self.selector = selector
    
    def getTrans(self):
        if self.selector == "GOOGLE":
            return self._googleTrans
        elif self.selector == "CAMBRIDGE":
            return self._monolingual
        else:
            raise ValueError(selector)

    def _googleTrans(self, text):
        trans = Translator().translate(text, dest = "zh-tw")
        return (trans.text)

    def _monolingual(self, text):
        requestUrl = "https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E/"
        classPattern = 'def ddef_d db'
        
        #requesting url
        req = requests.get(requestUrl + text)

        #parsing
        soup = BeautifulSoup(req.text, 'html.parser')
        resultList = soup.find_all(class_ = classPattern)
        result = ""
        
        if len(resultList) > 0:
            result = str(resultList[0])

        return result

'''
def main():
    tranObj = Translation('CAMBRIDGE').getTrans()
    print (tranObj('hygiene'))
    
if __name__ == "__main__":
    main()
'''
