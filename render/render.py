from selenium import webdriver
from PIL import Image
from jinja2 import Environment, PackageLoader, select_autoescape
import os, signal, time
import pymongo
import jinja2

jinjaEnv = jinja2.Environment(loader=jinja2.FileSystemLoader(searchpath="static/"))
#db = pymongo.MongoClient("mongodb://localhost/")["tokens"]["tokenRecord"]

def getHTML(tokenData):
    if tokenData["type"] in ["oil", "coal"]:
        return "basic_card.html"


opts = webdriver.FirefoxOptions()
opts.add_argument("--width=1200")
opts.add_argument("--height=1950")

browser = webdriver.Firefox(options=opts)


def recordVideo(w, h):
    xvfb = Xvfb(width=w, height=h, colordepth=24)

def render(tokenData, tokenID):
    #im_obj = Image.open(tokenData["image"])
    #width, height = im_obj.size
    #im_obj.close()
    width, height = (1200, 1200)

    browser.set_window_position(0, 0)
    browser.set_window_size(1200, 1950)
    #browser.get("data:text/html;charset=utf-8," + jinjaEnv.get_template(getHTML(tokenData)).render(tokenData))
    browser.get("file:///Users/bryan/Projects/cryptonauts-server/render/static/basic_card.html")
    time.sleep(1)
    #browser.set_window_size(width, height + browser.execute_script("return document.getElementById('card').offsetHeight"))
    browser.get_screenshot_as_file("finished_art/{tokenID}.png".format(tokenID=tokenID))

render({"type": "oil"}, 13)

#while(True):
#    query = db.find({"render": ""})
#    if(not query):
#        time.sleep(1)
#        continue
#    else:
#        for job in query:
#            render(job.tokenData, job.tokenID)
#            db.update_one({"tokenID", job.tokenID})
