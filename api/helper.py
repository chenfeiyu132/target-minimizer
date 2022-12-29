import asyncio
import requests
from aiohttp_ip_rotator import RotatingClientSession
import pandas as pd
from pathlib import Path
from base import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY




# querystring = {"store_id":"3991","tcin":"14713534"}

# response = requests.request("GET", url, headers=headers, params=querystring)
url = 'https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?is_bot=False&tcin=%s&key=%s&pricing_store_id=%s'
# print(response.text)

def getPriceOfItem(url):
    response = requests.get(url)
    json = response.json()
    if 'price' in json['data']['product']:
            return float(json['data']['product']['price']['formatted_current_price'].split(' - ')[0][1:])

def minCost(locations, item_id):
    minCost = float('infinity')
    minLocation = ''
    for location in locations:
        cost = getPriceOfItem(location, item_id)
        if cost < minCost:
            minCost = cost
            minLocation = location
    return (minCost, minLocation)

def getItemInfo(item_id, key):
    STORE_ID = 1075
    taskUrl = url %(item_id, key, STORE_ID)
    res = requests.get(taskUrl)
    return res.json()

async def asyncGetPriceOfItem(session, url):
    async with await session.get(url) as resp:
        json = await resp.json()
        if 'price' in json['data']['product']:
            return float(json['data']['product']['price']['formatted_current_price'].split(' - ')[0][1:])
        return None

async def asyncMinCost(tcin_tasks, item_id, key):
    # Create gateway object and initialise in AWS
    session = RotatingClientSession('https://redsky.target.com', AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, trust_env = True)
    await session.start()

    zip_cache = Path(__file__).parent / "saved_zips.csv"

    df = pd.read_csv(zip_cache)
    locationIds = [id for id in df['STORE_ID'] if int(id) != 0]
    locationNames = [name for name in df['STORE'] if not pd.isnull(name)]
    tcin_tasks[item_id]['tasks'] = []
    tcin_tasks[item_id]['status'] = 'started'
    #Initializes the async tasks to search for store prices
    prices = []
    for locationId in locationIds:
        taskUrl = url %(item_id, key, locationId)
        tcin_tasks[item_id]['tasks'].append(asyncio.ensure_future(asyncGetPriceOfItem(session, taskUrl)))
    prices = await asyncio.gather(*tcin_tasks[item_id]['tasks'])
    
    minLocs = {}
    store_ids = set()
    minCost = float('infinity')
    for index, locationId in enumerate(locationIds):
        if locationId in store_ids:
            continue
        store_ids.add(locationId)
        if prices[index] and prices[index] <= minCost:
            if prices[index] == minCost:
                minLocs['id'].append(locationId)
                minLocs['name'].append(locationNames[index])
            else:
                minCost = prices[index]
                minLocs['id'] = [locationId]
                minLocs['name'] = [locationNames[index]]
    tcin_tasks[item_id]['status'] = 'ended'

    await session.close()

    return minLocs, minCost

# locationIds = asyncio.run(storeIDGenerator.getLocationsAsync(df['ZIP'], 100, 1))
    

#minCostOfEggs = minCost(locationIDs, '14713534')
#print(minCostOfEggs)