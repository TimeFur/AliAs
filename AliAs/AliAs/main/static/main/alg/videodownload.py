import youtube_dl

class DownloadObj():
    def __init__(self):
        print ("Download object create")

    def download(self, url):
        ydl_opts = {}
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

'''
def main():
    videoObj = DownloadObj()
    videoObj.download("https://www.youtube.com/watch?v=5Kk5QxB9lWk")
    
if __name__ == "__main__":
    main()
'''
