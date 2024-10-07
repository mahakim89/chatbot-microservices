from flask import Flask, request, jsonify, render_template
import os
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index_test.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # For testing purposes, we'll echo the user's input
    return jsonify({"response": f"You said: {user_input}"})

    # OpenAI API integration (commented out)
    """
    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f'Bearer {os.getenv("OPENAI_API_KEY")}',
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": user_input}],
            },
        )
        response.raise_for_status()
        bot_response = response.json()["choices"][0]["message"]["content"]
        return jsonify({"response": bot_response})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    """


if __name__ == "__main__":
    app.run(debug=True)
