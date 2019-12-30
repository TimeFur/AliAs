import os
from googletrans import Translator

def translationFunc(text):
    trans = Translator().translate(text, dest = "zh-tw")
    return (trans.text)
'''
def main():
    result = translationFunc('Wayne')
    print (result)
    
if __name__ == "__main__":
    main()
'''
