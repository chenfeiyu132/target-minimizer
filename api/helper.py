import asyncio
from numpy import NaN
import requests
import storeIDGenerator
import pandas as pd
import aiohttp
<<<<<<< HEAD
=======
from pathlib import Path

>>>>>>> e81fe5c72fe10e82c917a367e02709acc11c33c7
# import sqlite3 as sl
from tinydb import TinyDB, Query



# querystring = {"store_id":"3991","tcin":"14713534"}



# response = requests.request("GET", url, headers=headers, params=querystring)
url = 'https://redsky.target.com/v2/plp/collection/%s?key=%s&pricing_store_id=%s'
# print(response.text)

def getPriceOfItem(storeID, item_id):
    response = requests.request("GET", url % (item_id, key, storeID))
    return float(response.json()['search_response']['items']['Item'][0]['price']['formatted_current_price'].split(' - ')[0][1:])

def minCost(locations, item_id):
    minCost = float('infinity')
    minLocation = ''
    for location in locations:
        cost = getPriceOfItem(location, item_id)
        if cost < minCost:
            minCost = cost
            minLocation = location
    return (minCost, minLocation)

async def asyncGetPriceOfItem(session, url):
    async with session.get(url) as resp:
        json = await resp.json()
        if 'price' in json['search_response']['items']['Item'][0]:
            return float(json['search_response']['items']['Item'][0]['price']['formatted_current_price'].split(' - ')[0][1:])
        return None

async def asyncMinCost(tcin_tasks, item_id):
    async with aiohttp.ClientSession() as session:
        #Gets the auth token from target for api requests
        s = requests.session()
        s.get('https://www.target.com')
        user_id = s.cookies['visitorId']
<<<<<<< HEAD

        db = TinyDB('minCost.json')
        df = pd.read_csv('saved_zips.csv')
=======
        db_file = Path(__file__).parent / "minCost.json"
        zip_cache = Path(__file__).parent / "saved_zips.csv"

        db = TinyDB(db_file)
        df = pd.read_csv(zip_cache)
>>>>>>> e81fe5c72fe10e82c917a367e02709acc11c33c7
        locationIds = [id for id in df['STORE_ID'] if int(id) != 0]
        locationNames = [name for name in df['STORE'] if not pd.isnull(name)]
        tcin_tasks[item_id]['tasks'] = []
        tcin_tasks[item_id]['status'] = 'started'
        #Initializes the async tasks to search for store prices
        for locationId in locationIds:
            taskUrl = url %(item_id, user_id, locationId)
            tcin_tasks[item_id]['tasks'].append(asyncio.ensure_future(asyncGetPriceOfItem(session, taskUrl)))
            prices = await asyncio.gather(*tcin_tasks[item_id]['tasks'])
        
        minLoc = {}
        minCost = float('infinity')
        for index, locationId in enumerate(locationIds):
            if prices[index] and prices[index] < minCost:
                minCost = prices[index]
                minLoc['id'] = locationId
                minLoc['name'] = locationNames[index]
        minLoc_name = minLoc['name']
        minLoc_id = minLoc['id']
        db.insert({'tcin': item_id, 'store_id': minLoc_id, 'store_name': minLoc_name, 'cost': minCost})
        tcin_tasks[item_id]['status'] = 'ended'

# locationIds = asyncio.run(storeIDGenerator.getLocationsAsync(df['ZIP'], 100, 1))
    

#minCostOfEggs = minCost(locationIDs, '14713534')
#print(minCostOfEggs)