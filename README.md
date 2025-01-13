# Financial-Data-Filtering-App
Take-home Assignment for ValueGlance: fetches annual income statements for Apple and allows users to filter and sort the data.

## How to Run App
1. Clone the repository
2. Create env variable: To access the API key, open your laptop terminal and run the command: *setx MY_SECRET_TOKEN "[api_key]"* . This creates an environment variable that locally stores the value of the api_key that the program will use. This can be done in either the laptop terminal and/or the vs code terminal. If the backend server does not run, restart the vs code terminal.
3. Start backend server: open a terminal, run the command: *cd backend*. then run the command *python/python3 data_processing.py*, depending on your python version.
4. Run the frontend application: open another terminal(let the backend server terminal still run) and run the command *npm start*.

Now the application should be running successfully!

If you don't have the following python libraries locally installed, run *pip install <library>*:
- os
- requests
- pandas
- os
- requests
- dotenv
