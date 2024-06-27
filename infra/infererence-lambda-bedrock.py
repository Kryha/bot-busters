import json
import boto3
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock_runtime = boto3.client(
    service_name='bedrock-runtime', 
    region_name='us-east-1'
)

def query_inference_endpoint(payload, model_id):
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
    
def parse_properties(source, mappings):
    """Helper function to extract and rename properties from a source dictionary."""
    return {new_key: source.get(old_key) for old_key, new_key in mappings.items()}

def lambda_handler(event, context):
    try:
        properties = {
            "inputs": "prompt",
            "parameters": {
                "max_new_tokens": "max_gen_len",
                "top_p": "top_p",
                "temperature": "temperature"
            },
            "model_id": "model_id"
        }

        # Extract the main inputs
        body = {"prompt": event.get('inputs')}

        # Extract the nested parameters
        parameters = parse_properties(event.get('parameters', {}), properties['parameters'])

        # Merge the dictionaries
        body.update(parameters)
        
        model_id = event.get('model_id', 'meta.llama2-13b-chat-v1')

        reply = query_inference_endpoint(body, model_id)  # Call the inference endpoint with the constructed body
        
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