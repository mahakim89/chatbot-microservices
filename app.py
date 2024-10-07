from flask import Flask, request, jsonify, render_template
import os
import requests
from dotenv import load_dotenv
import logging

load_dotenv()
app = Flask(__name__)

OPENAI_MODEL = "gpt-3.5-turbo"

logging.basicConfig(level=logging.INFO)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f'Bearer {os.getenv("OPENAI_API_KEY")}',
                "Content-Type": "application/json",
            },
            json={
                "model": OPENAI_MODEL,  # Use the constant defined above
                "messages": [{"role": "user", "content": user_input}],
            },
        )
        response.raise_for_status()
        bot_response = response.json()["choices"][0]["message"]["content"]
        return jsonify({"response": bot_response})
    except requests.exceptions.RequestException as e:
        logging.error(f"API request failed: {str(e)}")
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
