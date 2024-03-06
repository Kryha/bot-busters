import os
import json
import boto3
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

ENDPOINT_NAME = os.environ['ENDPOINT_NAME']

client = boto3.client("sagemaker-runtime")

def query_inference_endpoint(payload):
    response = client.invoke_endpoint(
        EndpointName=ENDPOINT_NAME,
        ContentType="application/json",
        Body=json.dumps(payload),
    )
    response = json.loads(response["Body"].read().decode("utf8"))
    return response

def lambda_handler(event, context):
    logger.info(event)
    try:
        body = {"inputs": event['inputs'], "parameters": event['parameters']}
        
        reply = query_inference_endpoint(body)
     
        # Return the updated data in the response
        response = {
            "statusCode": 200,
            "body": reply[0]['generated_text']
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
