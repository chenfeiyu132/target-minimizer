from flask import Flask, make_response, request
import asyncio
from flask.json import jsonify
import requests
from helper import asyncMinCost, getItemInfo
from threading import Thread
from pathlib import Path
from base import db
from bson import json_util

app = Flask(__name__, static_folder='../build', static_url_path='/')
tcin_tasks = {}

class Worker(Thread):
    def __init__(self, tcin):
        Thread.__init__(self)
        self.tcin = tcin
    def run(self):
        #Gets the auth token from target for api requests
        s = requests.session()
        s.get('https://www.target.com')
        user_id = s.cookies['visitorId']
        
        minLocs, minCost = asyncio.run(asyncMinCost(tcin_tasks, self.tcin, user_id))
        item_info = getItemInfo(self.tcin, user_id)
        item_name = item_info['search_response']['items']['Item'][0]['title']
        image_data = item_info['search_response']['items']['Item'][0]['images'][0]
        item_image_url = image_data['base_url'] + image_data['primary']
        items = db['items']
        items.insert_one({'name': item_name, 'tcin': self.tcin, 'min_stores': minLocs, 'min_cost': minCost, 'image_url': item_image_url})

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/item/<tcin>')
def get_item(tcin):
    items = db['items']
    item = items.find_one({'tcin': tcin}, {'_id': False})
    if item:
        minCost, minLocs = item['min_cost'], item['min_stores']
        return make_response(jsonify({'success': True, 'message': 'The best price is {0} at {1}({2}).'.format(minCost, minLocs['name'][0], minLocs['id'][0]), 'result': item}), 200)
    else:
        if tcin not in tcin_tasks:
            # Spawns a different thread in the background to process the minCost finding task(time consuming)
            # Usually done with Redis and Docker(broker -> worker) but this is more lightweight
            tcin_tasks[tcin] = {}
            async_task = Worker(tcin = tcin)
            async_task.start()
            return make_response(jsonify({'success': False, 'message': 'search starting'}), 202)
        else:
            return make_response(jsonify({'success': False, 'message': 'waiting for item to be searched'}), 202)

@app.route('/item/random')
def get_random_item():
    items = db['items']
    random_sample = list(items.aggregate([{ '$sample': { 'size' : 1 }}, {'$unset': ['_id']}]))[0]
    minCost, minLocs = random_sample['min_cost'], random_sample['min_stores']
    return make_response(jsonify({'success': True, 'message': 'The best price is {0} at {1}({2}).'.format(minCost, minLocs['name'][0], minLocs['id'][0]), 'result': random_sample}), 200)

@app.route('/item/search')
def search_items():
    keyword = request.args['query']
    items = db['items']
    filtered_items = list(items.find({'name': {'$regex': '.*{0}.*'.format(keyword), '$options': 'i'}}, {'_id': False}))
    return make_response(jsonify({'success': True, 'message' : 'Found {0} items matching the query {1}'.format(len(filtered_items), keyword), 'result': filtered_items}), 200)