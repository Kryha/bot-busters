# import os
import json
import boto3
import logging

model_id = 'meta.llama2-13b-chat-v1' 

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# ENDPOINT_NAME = os.environ['ENDPOINT_NAME']

bedrock_runtime = boto3.client(
    service_name='bedrock-runtime', 
    region_name='us-east-1'
)

def query_inference_endpoint(payload):
    response = bedrock_runtime.invoke_model(
        body=json.dumps(payload), 
        modelId=model_id, 
        accept='application/json', 
        contentType='application/json'
    )
    body = response.get('body').read().decode('utf-8')
    response_body = json.loads(body)
    response = response_body['generation'].strip()
    return response

def lambda_handler(event, context):
    logger.info(event)
    try:
        body = {
            "prompt": event['inputs'], 
            'max_gen_len': 512,
            'top_p': 0.9,
            'temperature': 0.2
        }
        
        reply = query_inference_endpoint(body)
        
        # Debugging
        logger.info(reply)
        
        # Return the updated data in the response
        response = {
            "statusCode": 200,
            "body": reply
        }
        return response
    
    except Exception:
        # Log the error with stack trace
        logger.exception("An error occurred in the Inference Lambda function")
        
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": "Inference Failed"})
        }
        return response