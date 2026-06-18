from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# CRITICAL: Enables Cross-Origin Resource Sharing so your frontend can connect
CORS(app)

# 1. Base Test Route (GET Request)
# URL: http://127.0.0.1:5000/
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "online",
        "message": "Sustainable Tomorrow API Backbone is running smoothly!"
    })

# 2. Main Data Processing Route (POST Request Placeholder)
# URL: http://127.0.0.1:5000/api/calculate
@app.route('/api/calculate', methods=['POST'])
def calculate_sustainability():
    # Grab the incoming JSON data sent from the frontend
    data = request.get_json()
    
    # Fallback default if data is empty or missing keys
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    # Example input placeholder tracking user actions
    user_input = data.get('input_value', 'default')
    
    # --- BACKEND LOGIC APPARATUS PLACEHOLDER ---
    # This is where your backend team will plug in formulas or algorithms tomorrow.
    calculated_score = len(user_input) * 15  # Simple mock calculation
    # --------------------------------------------

    # Construct the JSON payload structure agreed upon in your team contract
    response_payload = {
        "status": "success",
        "score": calculated_score,
        "recommendation": "Switching to LED bulbs or tracking localized route configurations reduces carbon outputs."
    }
    
    return jsonify(response_payload)

if __name__ == '__main__':
    # Runs local server instance on port 5000 with hot-reloading active
    app.run(debug=True, port=5000)