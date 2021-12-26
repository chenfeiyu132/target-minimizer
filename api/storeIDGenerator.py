import requests
import pandas as pd
import asyncio
import aiohttp
from uszipcode import SearchEngine, Zipcode


s = requests.session()
s.get('https://www.target.com')

key = s.cookies['visitorId']

def getLocations(zips: str, radius:int, storesPerZip:int):
    locationIDs = []
    for zip in zips:
        url = 'https://redsky.target.com/v3/stores/nearby/%s?key=%s&limit=%s&within=%s&unit=mile' %(zip, key, storesPerZip, radius)
        response = requests.request("GET", url)
        json = response.json()[0]
        if 'locations' in json and json['locations']:
            locationIDs.append(json['locations'][0]['location_id'])
    return locationIDs

async def getLocationID(session, url):
    async with session.get(url) as resp:
        json = await resp.json()
        json = json[0]
        if 'locations' in json and json['locations']:
            return json['locations'][0]['location_id']
        else:
            return ''

async def getLocationsAsync(zips:str, radius:int, storesPerZip:int):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for zip in zips:
            url = 'https://redsky.target.com/v3/stores/nearby/%s?key=%s&limit=%s&within=%s&unit=mile' %(zip, key, storesPerZip, radius)
            tasks.append(asyncio.ensure_future(getLocationID(session, url)))
            locationIDs = await asyncio.gather(*tasks)
    return locationIDs

def generateZips():
    WESTMOST_LONG = -124.785
    NORTHMOST_LAT = 49.002389
    SOUTHMOST_LAT = 24.446667
    EASTMOST_LONG = -75.3544729
    LONG_INCREMENT = 1.25
    LAT_INCREMENT = 1.25
    long = WESTMOST_LONG
    lat = SOUTHMOST_LAT

    index = 0
    rows = []
    search = SearchEngine(simple_zipcode=True)
    while lat < NORTHMOST_LAT:
        long = WESTMOST_LONG
        while long < EASTMOST_LONG:
            #result = rg.search((lat, long), mode=1)
            # Possible setting = radius = 50, sort_by=Zipcode.population, ascending=False,
            result = search.find(lat = lat, lng = long, returns = 1)
            long += LONG_INCREMENT
            if result:
                locationDetails = result[0]
                postCode = locationDetails.zipcode
                city = locationDetails.major_city
                state = locationDetails.state
                county = locationDetails.county
                entry = {'ZIP': postCode, 'LAT': lat, 'LONG': long, 'CITY': city, 'STATE': state, 'COUNTY': county}
                rows.append(entry)
        lat += LAT_INCREMENT
    df = pd.DataFrame(rows)
    df.to_csv('saved_zips.csv', index=False)
