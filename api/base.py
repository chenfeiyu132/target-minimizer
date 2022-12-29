from pymongo import MongoClient
from dotenv import load_dotenv
from os import environ


load_dotenv()
client = MongoClient(environ.get('MONGO_URI'))
db = client['production']
TARGET_KEY = environ.get('TARGET_KEY')
AWS_ACCESS_KEY_ID = environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = environ.get('AWS_SECRET_ACCESS_KEY')

