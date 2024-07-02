import json
import boto3
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

client = boto3.client(
    service_name='bedrock-runtime', 
    region_name='us-east-1'
)

def query_converse_endpoint(modelId, messages, inferenceConfig, systemPrompt):
    response = client.converse(
        modelId=modelId,
        messages=messages,
        inferenceConfig=inferenceConfig,
        system=systemPrompt
    )
    
    response_text = response["output"]["message"]["content"][0]["text"].strip()
    return response_text
    
def lambda_handler(event, context):
    try:
        # Extract the props from request body
        modelId = event.get('modelId', 'meta.llama3-8b-instruct-v1:0')
        messages = event.get('messages')
        inferenceConfig = event.get('inferenceConfig')
        systemPrompt = event.get('systemPrompt')
        
        reply = query_converse_endpoint(modelId, messages, inferenceConfig, systemPrompt)  # Call the inference endpoint with the constructed body
               
        response = {
            "statusCode": 200,
            "body": reply
        }
        return response
    
    except Exception:
        # Log the error with stack trace
        logger.exception("An error occurred in the Conversation Inference Lambda function")
        
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": "Inference Failed"})
        }
        return response