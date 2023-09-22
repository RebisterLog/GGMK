import requests
from bs4 import BeautifulSoup

schedule_url = 'http://uoggmk.by/%D1%80%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5/'

headers = {
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",

    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0 (Edition Yx GX)"
}

def GetScheduleChangesUrls():
    request = requests.get(schedule_url, headers=headers)
    src = request.text

    soup = BeautifulSoup( src, 'html.parser' )
    div = soup.find_all("img")

    schedules = { "Today": div[5]["src"], "Tommorow": div[6]["src"] }

    return schedules

def DownloadImageFromUrl(url: str, imageName: str):
    request = requests.get(url, headers=headers)
    
    with open(imageName+".png", 'wb') as file:
        file.write(request.content)
    

#links = GetScheduleChangesUrls()
#DownloadImageFromUrl(links["Tommorow"],"tommorow")