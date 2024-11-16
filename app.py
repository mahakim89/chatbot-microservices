from flask import Flask, request, jsonify, render_template
import os
import requests
from dotenv import load_dotenv
import logging

load_dotenv()
app = Flask(__name__)

# Define the model as a constant at the top of your file
# gpt-3.5-turbo (default)
# gpt-3.5-turbo-16k (for longer context)
# gpt-4 (more capable but more expensive)
# gpt-4-32k" (for even longer context)

OPENAI_MODEL = "gpt-3.5-turbo"

logging.basicConfig(level=logging.INFO)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    model = request.json.get("model", OPENAI_MODEL)  # Use provided model or default

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        logging.info(f"Sending request with model: {model}")
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f'Bearer {os.getenv("OPENAI_API_KEY")}',
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": [{"role": "user", "content": user_input}],
            },
        )
        response.raise_for_status()
        bot_response = response.json()["choices"][0]["message"]["content"]
        logging.info(f"API reports using model: {response.json()['model']}")
        return jsonify({"response": bot_response})
    except requests.exceptions.RequestException as e:
        logging.error(f"API request failed: {str(e)}")
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
