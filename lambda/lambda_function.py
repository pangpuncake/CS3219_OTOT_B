from requests import request
import json

API_KEY = "YOUR_API_KEY"


def lambda_handler(event, context):
    print(event)
    print(context)
    url = "https://api.apilayer.com/exchangerates_data/symbols"

    payload = {}
    headers = {
        "apikey": API_KEY
    }

    symbol: str = ""
    if event.get("queryStringParameters", None) and event["queryStringParameters"].get("search", None):
        symbol = event["queryStringParameters"]["search"]
        symbol = symbol.upper()

    response = request("GET", url, headers=headers, data=payload)
    json_dict = json.loads(response.text)

    if json_dict.get("success", None):
        symbol_dict = json_dict["symbols"]
        symbol_list = list(
            filter(lambda sym: sym.startswith(symbol), symbol_dict))
        symbol_dict = {k: symbol_dict[k] for k in symbol_list}
        symbol_dict_str = json.dumps(symbol_dict)
        return {
            "statusCode": 200,
            "body": symbol_dict_str
            # "body": json.dumps(event)
        }

    return {
        'statusCode': response.status_code,
        'body': json_dict.get("message", "Failed to get symbols")
    }
