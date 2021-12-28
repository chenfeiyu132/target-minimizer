from pymongo import MongoClient
from dotenv import load_dotenv
from os import environ


load_dotenv()
client = MongoClient(environ.get('MONGO_URI'))
db = client['production']
