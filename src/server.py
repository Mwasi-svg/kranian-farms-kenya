from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

genai.configure(api_key="AIzaSyDd5bDQUz5hTC8rNOYEKjfUsPPzpRbN1iI")  # <-- Replace with your Gemini key
model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    response = model.generate_content(user_message)
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
