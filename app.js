// Web Speech API Initialization
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

let finalTranscriptBuffer = "";

const liveTextUI = document.getElementById('liveTranscript');
const statusUI = document.getElementById('statusIndicator');
const btnStart = document.getElementById('startMicBtn');
const btnStop = document.getElementById('stopMicBtn');
const btnProcess = document.getElementById('processBtn');

// 1. Microphone Event Listeners
recognition.onstart = function() {
    statusUI.innerHTML = "🎙️ Listening... (Speak now)";
    statusUI.style.color = "var(--success)";
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnStop.style.background = "var(--danger)";
};

recognition.onresult = function(event) {
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            finalTranscriptBuffer += event.results[i][0].transcript + " ";
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
    // Update the UI with both the locked-in text and the words currently being spoken
    liveTextUI.value = finalTranscriptBuffer + interimTranscript;
    liveTextUI.scrollTop = liveTextUI.scrollHeight; // Auto-scroll to bottom
};

recognition.onerror = function(event) {
    statusUI.innerHTML = "❌ Microphone Error: " + event.error;
    statusUI.style.color = "var(--danger)";
    resetMicButtons();
};

recognition.onend = function() {
    statusUI.innerHTML = "⏹ Microphone stopped.";
    statusUI.style.color = "var(--text-muted)";
    resetMicButtons();
};

function startListening() { recognition.start(); }
function stopListening() { recognition.stop(); }

function resetMicButtons() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    btnStop.style.background = "var(--border)";
}

// 2. The AI Backend API Call
async function processTranscript() {
    const currentText = liveTextUI.value;
    
    if (!currentText.trim()) {
        alert("Transcript is empty! Speak into the mic first.");
        return;
    }

    btnProcess.disabled = true;
    statusUI.innerHTML = "⏳ Sending to Fiduciary.AI Backend for Fiduciary Synthesis...";
    statusUI.style.color = "var(--accent)";

    try {
        // Send the live text to your Python FastAPI server
        const response = await fetch('http://localhost:8000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript: currentText })
        });

        if (!response.ok) throw new Error(`Backend Error: ${response.status}`);

        const parsedJson = await response.json();
        
        // Populate the Dashboard Panels
        document.getElementById('complianceMemo').value = parsedJson.compliance_summary;
        document.getElementById('emailDraft').value = parsedJson.client_email_draft;
        
        // Render Action Items
        const taskContainer = document.getElementById('taskList');
        taskContainer.innerHTML = ''; 
        parsedJson.action_items.forEach(item => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.innerHTML = `
                <input type="checkbox" style="margin-right: 10px; margin-top: 5px;">
                <div>
                    <span class="badge">${item.assignee}</span>
                    <span>${item.task}</span>
                </div>
            `;
            taskContainer.appendChild(taskDiv);
        });

        statusUI.innerHTML = "✅ CRM Sync Complete!";
        statusUI.style.color = "var(--success)";

    } catch (error) {
        console.error(error);
        statusUI.innerHTML = `❌ Error: Make sure your Python server is running on port 8000.`;
        statusUI.style.color = "var(--danger)";
    } finally {
        btnProcess.disabled = false;
    }
}