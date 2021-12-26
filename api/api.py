from flask import Flask, make_response
import asyncio
from helper import asyncMinCost
from threading import Thread
from pathlib import Path
from base import db

app = Flask(__name__, static_folder='../build', static_url_path='/')
tcin_tasks = {}

class Worker(Thread):
    def __init__(self, tcin):
        Thread.__init__(self)
        self.tcin = tcin
    def run(self):
        asyncio.run(asyncMinCost(tcin_tasks, self.tcin))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/item/<tcin>')
def get_item(tcin):
    items = db['items']
    existing_info = items.find_one({'tcin': tcin})
    if existing_info:
        minCost, minLocs = existing_info['cost'], existing_info['min_stores']
        print(minLocs)
        return make_response({'success': True, 'message': 'The best price is {0} at {1}({2}).'.format(minCost, minLocs['name'][0], minLocs['id'][0]), 'minCost': minCost, 'min_stores': minLocs}, 200)
    else:
        if tcin not in tcin_tasks:
            # Spawns a different thread in the background to process the minCost finding task(time consuming)
            # Usually done with Redis and Docker(broker -> worker) but this is more lightweight
            tcin_tasks[tcin] = {}
            async_task = Worker(tcin = tcin)
            async_task.start()
            return make_response({'success': False, 'message': 'search starting'}, 202)
        else:
            return make_response({'success': False, 'message': 'waiting for item to be searched'}, 202)
        