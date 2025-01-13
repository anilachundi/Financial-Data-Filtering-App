import pandas as pd
import requests
from flask import Flask, jsonify
from flask_cors import CORS

import os
import requests
from dotenv import load_dotenv



app = Flask(__name__)
CORS(app)


def fetch_and_convert_to_dataframe(api_url):
    response = requests.get(api_url).json()

    if not response:
        raise ValueError("Response format is not compatible with a DataFrame.")

    data_frame = pd.DataFrame(response)
    return data_frame[["date", "revenue", "netIncome", "grossProfit", "eps", "operatingIncome"]]



secret_token = os.environ.get("MY_SECRET_TOKEN")

api_url = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=' + str(secret_token)
df = fetch_and_convert_to_dataframe(api_url)

if df is not None:
    print(df)


@app.route('/dataframe', methods=['GET'])
def get_dataframe():
    data_json = df.to_json(orient='records')
    return jsonify(data_json)

if __name__ == '__main__':
    app.run(debug=True)