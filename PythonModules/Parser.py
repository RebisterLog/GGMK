import datetime
import requests
import os
from bs4 import BeautifulSoup

schedule_url = 'http://uoggmk.by/%D1%80%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5/'
headers = {
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0 (Edition Yx GX)"
}

images = []

date = datetime.datetime
lastUpdateTime = date.now();

def ParseImagesUrls():
    request = requests.get(schedule_url, headers=headers)
    src = request.text

    soup = BeautifulSoup( src, 'html.parser' )
    div = soup.find_all("img")

    schedules = [ div[5]["src"], div[6]["src"] ]

    return schedules

def DownloadImageFromUrl(url: str, imageName: str):
    request = requests.get(url, headers=headers)


    path = f'{os.curdir}/PythonModules/Temp/{imageName}_{date.now().date()}.png'

    with open(path, 'wb') as file:
        file.write(request.content)
        file.close()
        return path

def GetSchedules():
    global lastUpdateTime

    if date.now() - lastUpdateTime >= datetime.timedelta(minutes=20):   #The last request was completed in LESS than 20 minutes, the dowloaded images are returned
        return images

    images.clear()
    lastUpdateTime = date.now()     #The last request was executed for MORE than 20 minutes, the images are updated

    links = ParseImagesUrls()
    images.append(DownloadImageFromUrl(links[0],"firstSchedule"))
    images.append(DownloadImageFromUrl(links[1],"secondSchedule"))

    return images

#print(GetSchedules())

