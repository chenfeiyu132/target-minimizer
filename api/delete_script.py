import boto3
from base import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from botocore.exceptions import ClientError
import time

regions = [
    "ap-northeast-3", "ap-northeast-2", "ap-southeast-1",
    "ap-southeast-2", "ap-northeast-1", "sa-east-1"
] # removed "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    # "eu-west-1", "eu-west-2", "eu-west-3", "eu-north-1",
    # "eu-central-1", "ca-central-1", "ap-south-1", 


for region in regions:
    session = boto3.Session(
            region_name=region,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
    client = session.client('apigateway')
    
    print(f'starting delete for region: {region}')

    apis = client.get_rest_apis()
    index = 0
    while index < len(apis['items']):
        id = apis['items'][index]['id']
        try:
            client.delete_rest_api(restApiId = id)
            print('successfully deleted one')
            index += 1
        except ClientError as e:
            if e.response["Error"]["Code"] == "TooManyRequestsException":
                print("Too many requests when deleting rest API, sleeping for 3 seconds")
                time.sleep(3)
                    