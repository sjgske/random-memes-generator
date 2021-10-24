import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time

driver = webdriver.Chrome(executable_path="C:/Users/user/OneDrive - 전북대학교/바탕 화면/sparta/hip/chromedriver.exe")
url = 'https://m.search.naver.com/search.naver?where=m_image&sm=mtb_jum&query=%ED%95%80%ED%84%B0%EB%A0%88%EC%8A%A4%ED%8A%B8+%EC%A7%A4'
driver.get(url)

time.sleep(5)

soup = BeautifulSoup(driver.page_source, 'html.parser')

def zzal_crawling(html):
    temp_list = []

    imgs = soup.select('#ct > section > div > div.api_photo_tile._grid > div > div > div.thumb > a > img')
    
    for img in imgs:
        imgurl = img['src']
        if not 'base64' in imgurl:
            temp_list.append([imgurl])

    return temp_list

driver.quit()


zzal_list = [] #리스트에 저장

for page in [1,2]:
    req = requests.get('https://m.search.naver.com/search.naver?where=m_image&sm=mtb_jum&query=%ED%95%80%ED%84%B0%EB%A0%88%EC%8A%A4%ED%8A%B8+%EC%A7%A4'.format(page))
    html = BeautifulSoup(req.text, 'html.parser')
    
    zzal_list += zzal_crawling(html)

for item in zzal_list:
    print(item)