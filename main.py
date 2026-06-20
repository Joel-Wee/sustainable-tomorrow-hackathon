from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Replace your old google imports with these two lines:
from google import genai
from google.genai import types
import json

app = FastAPI(title="Fiduciary.AI Gemini Backend")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Initialize the NEW Official SDK
client = genai.Client(api_key="AQ.Ab8RN6JqK_reY2gaCd1GrUTDJawEeKCoC1Oc97QITfXfDMl0zQ")

# 2. Define the Incoming Data Structure
class TranscriptPayload(BaseModel):
    transcript: str

# 3. The Gemini API Endpoint
@app.post("/api/analyze")
async def analyze_meeting(payload: TranscriptPayload):
    if not payload.transcript.strip():
        raise HTTPException(status_code=400, detail="Transcript is empty.")
        
    try:
        # Bulletproof prompt to guarantee the UI doesn't break
        system_prompt = """
        You are a strict SEC compliance officer. Analyze the transcript and extract facts, tasks, and an email.
        You must reply with ONLY a raw JSON object using this exact structure:
        {
            "compliance_summary": "string",
            "action_items": [{"assignee": "string", "task": "string"}],
            "client_email_draft": "string"
        }
        """

        # Use the new SDK to generate the content
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=payload.transcript,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
                temperature=0.1,
            ),
        )
        
        # Parse the JSON string into a Python dictionary and send it to the frontend
        parsed_data = json.loads(response.text)
        return parsed_data

    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))