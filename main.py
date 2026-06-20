from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import json

app = FastAPI(title="CapsLock AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key="AQ.Ab8RN6JqK_reY2gaCd1GrUTDJawEeKCoC1Oc97QITfXfDMl0zQ")

class TranscriptPayload(BaseModel):
    transcript: str

@app.post("/api/analyze")
async def analyze_meeting(payload: TranscriptPayload):
    if not payload.transcript.strip():
        raise HTTPException(status_code=400, detail="Transcript is empty.")
        
    try:
        system_prompt = """
        You are a strict SEC compliance officer and financial advisor assistant. Analyze the transcript.
        You must reply with ONLY a raw JSON object using this exact structure:
        {
            "compliance_summary": "string",
            "action_items": [{"assignee": "string", "task": "string"}],
            "client_email_draft": "string"
        }
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=payload.transcript,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
                temperature=0.1,
            ),
        )
        
        return json.loads(response.text)

    except Exception as e:
        print(f"Backend Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))