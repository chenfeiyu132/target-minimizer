from flask import Flask, make_response
from tinydb import TinyDB, Query
import asyncio
import helper
from threading import Thread
from pathlib import Path

app = Flask(__name__, static_folder='../build', static_url_path='/')
tcin_tasks = {}

class Worker(Thread):
    def __init__(self, tcin):
        Thread.__init__(self)
        self.tcin = tcin
    def run(self):
        asyncio.run(helper.asyncMinCost(tcin_tasks, self.tcin))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/item/<tcin>')
def get_item(tcin):
    Item = Query()
    db = TinyDB(Path(__file__).parent / "minCost.json")
    existing_info = db.search(Item.tcin == tcin)
    if existing_info:
        minCost, minLoc_name, minLoc_id = existing_info[0]['cost'], existing_info[0]['store_name'], existing_info[0]['store_id']
        return make_response({'success': True, 'message': 'The best price is {0} at {1}({2}).'.format(minCost, minLoc_name, minLoc_id), 'minCost': minCost, 'location_name': minLoc_name, 'location_id': minLoc_id}, 200)
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
        