from flask import Flask, request, jsonify
from flask_cors import CORS
# import google.generativeai as genai # No longer using Gemini directly here
from agent import get_agent_response # Import your custom agent function

# Replace with your Gemini API key
# genai.configure(api_key="AIzaSyDd5bDQUz5hTC8rNOYEKjfUsPPzpRbN1iI") # Not needed here

# model = genai.GenerativeModel( # Not needed here
#     model_name="models/gemini-1.5-pro-latest",
#     system_instruction="""# You are Kranian, the helpful and friendly AI assistant for kranianfarms.com.
# Answer customer questions casually, informatively, and clearly.
# """# )

app = Flask(__name__)
CORS(app)  # So frontend can connect

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    
    # Get response from your custom agent
    agent_reply = get_agent_response(user_message)
    
    return jsonify({"response": agent_reply})

if __name__ == "__main__":
    # Make sure to run on host 0.0.0.0 to be accessible externally if needed
    app.run(host='0.0.0.0', port=5000)
