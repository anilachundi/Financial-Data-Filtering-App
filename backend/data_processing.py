import pandas as pd
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def fetch_and_convert_to_dataframe(api_url):
    response = requests.get(api_url).json()

    if not response:
        raise ValueError("Response format is not compatible with a DataFrame.")

    data_frame = pd.DataFrame(response)
    return data_frame[["date", "revenue", "netIncome", "grossProfit", "eps", "operatingIncome"]]


api_url = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=P9wVB0s4uzpr9nIhggYndhy97IpVL3oA'
df = fetch_and_convert_to_dataframe(api_url)

if df is not None:
    print(df)


@app.route('/dataframe', methods=['GET'])
def get_dataframe():
    data_json = df.to_json(orient='records')
    return jsonify(data_json)

if __name__ == '__main__':
    app.run(debug=True)