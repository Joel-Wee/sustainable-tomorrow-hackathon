// --- State Variables ---
let recognition = null;
let isRecording = false;
let finalTranscript = "";

// --- DOM Elements ---
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const transcriptBox = document.getElementById('transcript-box');
const summaryBox = document.getElementById('summary-box');
const recordingBadge = document.getElementById('recording-badge');
const recordingPulseRing = document.getElementById('recording-pulse-ring');
const audioVisualizer = document.getElementById('audio-visualizer');
const callStatusText = document.getElementById('call-status-text');

// --- 1. Speech Recognition Setup ---
function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        return false;
    }
    
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let currentFinal = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                currentFinal += event.results[i][0].transcript + '. ';
                finalTranscript += event.results[i][0].transcript + '. ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        // Update UI: Add finalized text to a paragraph
        if (currentFinal) {
            const p = document.createElement('p');
            p.className = "mb-2 text-slate-800";
            p.innerHTML = `<strong class="text-blue-600">Sarah Ahmad (You):</strong> ${currentFinal}`;
            transcriptBox.appendChild(p);
        }
        
        // Handle interim (grey, changing text)
        let interimSpan = document.getElementById('interim-span');
        if (!interimSpan) {
            interimSpan = document.createElement('span');
            interimSpan.id = 'interim-span';
            interimSpan.className = 'text-slate-400 italic';
            transcriptBox.appendChild(interimSpan);
        }
        interimSpan.innerText = interimTranscript;
        
        // Auto-scroll to bottom
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
        // Restart if stopped unexpectedly, unless we manually pressed end
        if (isRecording && recognition) { try { recognition.start(); } catch(e){} }
    };
    
    return true;
}

// --- 2. Button Handlers ---
function startMeeting() {
    // FORCE recording state to true immediately so Stage Magic ALWAYS works
    isRecording = true; 
    finalTranscript = "";
    
    // Update UI Buttons and Visualizers
    startBtn.classList.add('hidden');
    endBtn.classList.remove('hidden');
    recordingBadge.classList.remove('hidden');
    recordingPulseRing.classList.remove('hidden');
    audioVisualizer.classList.remove('hidden');
    callStatusText.innerText = "Call in progress...";
    
    transcriptBox.innerHTML = ''; // Clear waiting text
    
    const hasMicSupport = initSpeechRecognition();
    
    if (hasMicSupport) {
        try {
            recognition.start();
            transcriptBox.innerHTML = '<p class="text-emerald-500 text-xs font-bold mb-4 uppercase tracking-wide">Microphone Active - Listening...</p>';
        } catch (e) {
            console.error("Mic error", e);
            transcriptBox.innerHTML = '<p class="text-amber-500 text-xs font-bold mb-4 uppercase tracking-wide">Browser Mic Blocked - Stage Magic Demo Mode Active (Press 1, 2, 3)</p>';
        }
    } else {
        transcriptBox.innerHTML = '<p class="text-amber-500 text-xs font-bold mb-4 uppercase tracking-wide">Browser Mic Not Supported - Stage Magic Demo Mode Active (Press 1, 2, 3)</p>';
    }
}

function endMeeting() {
    isRecording = false;
    if(recognition) {
        try { recognition.stop(); } catch(e) {}
    }
    
    // Update UI Buttons and Visualizers
    endBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    recordingBadge.classList.add('hidden');
    recordingPulseRing.classList.add('hidden');
    audioVisualizer.classList.add('hidden');
    callStatusText.innerText = "Call ended";
    startBtn.innerHTML = '<i class="ph ph-phone-call text-lg"></i> Start New Call';
    
    // Remove interim span
    const interim = document.getElementById('interim-span');
    if(interim) interim.remove();

    // Trigger Fake AI Summary
    generateGeminiSummary(finalTranscript);
}

// --- 3. HARDCODED "OPTION 2" AI SUMMARY (100% Safe for Stage) ---
async function generateGeminiSummary(transcriptText) {
    if (!transcriptText.trim()) {
        summaryBox.innerHTML = `<div class="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">No speech detected to summarize. Use 1, 2, 3 keys to inject demo text.</div>`;
        return;
    }

    // Show Loading State (The Shimmer)
    summaryBox.innerHTML = `
        <div class="space-y-4">
            <div class="h-4 w-3/4 rounded shimmer"></div>
            <div class="h-4 w-full rounded shimmer"></div>
            <div class="h-4 w-5/6 rounded shimmer"></div>
            <div class="h-20 w-full rounded shimmer mt-4"></div>
            <p class="text-xs text-center text-indigo-500 font-semibold animate-pulse mt-4">Gemini 2.5 is analyzing the conversation...</p>
        </div>
    `;

    // Wait exactly 2.5 seconds to simulate AI "thinking" time
    setTimeout(() => {
        // Hardcoded perfect summary based on your 1, 2, 3 keyboard script
        const fakeAiHTML = `
            <div class="prose prose-sm prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-blue-600 prose-li:text-slate-600">
                <h4>Executive Summary</h4>
                <p>The client, John Doe, expressed concerns regarding tech sector volatility affecting his portfolio. Additionally, he requires immediate assistance restructuring his corporate tax setup before Q4 and needs a liquidity plan for his daughter's 2027 university tuition.</p>
                
                <h4>Key Concerns</h4>
                <ul>
                    <li>Portfolio exposure to recent tech sector market drops.</li>
                    <li>Rapid startup growth requiring urgent corporate tax restructuring.</li>
                    <li>Liquid cash requirements for daughter's university tuition in 2027.</li>
                </ul>
                
                <h4>Action Items</h4>
                <ul>
                    <li>Review and rebalance current investment portfolio to reduce tech sector risk.</li>
                    <li>Calculate projected tuition costs and set up a liquid education fund.</li>
                    <li>Schedule a follow-up meeting to finalize the portfolio changes.</li>
                </ul>
                
                <h4>Partner Referral</h4>
                <ul>
                    <li><strong>Recommended:</strong> Refer to <em>PartnerLink Corporate Tax Services</em> for the Q4 startup restructuring.</li>
                </ul>
            </div>
            <button class="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-2 border border-slate-300">
                <i class="ph ph-floppy-disk"></i> Save to CRM
            </button>
        `;
        
        summaryBox.innerHTML = fakeAiHTML;
    }, 2500); // 2.5 seconds
}

// --- 4. HACKATHON STAGE MAGIC (Hidden Keyboard Shortcuts) ---
document.addEventListener('keydown', function(event) {
    // Only works if the meeting has started
    if (!isRecording) return; 
    
    let clientLine = "";
    
    if (event.key === '1') {
        clientLine = "Hi Sarah. Yes, I wanted to discuss my portfolio. I'm very worried about the recent tech sector drops.";
    } else if (event.key === '2') {
        clientLine = "Also, my startup is scaling fast. We need to restructure our corporate tax setup before Q4.";
    } else if (event.key === '3') {
        clientLine = "Lastly, Emma starts university in 2027. We need liquid cash ready for her tuition. Can you help plan that?";
    }
    
    if (clientLine !== "") {
        // Add to the final transcript so the check passes
        finalTranscript += " " + clientLine + ". ";
        
        // Visually add it to the chat box
        const p = document.createElement('p');
        p.className = "mb-2 animate-pulse text-slate-800"; // Slight pulse so you know it worked
        p.innerHTML = `<strong>John Doe (Client):</strong> ${clientLine}`;
        
        // Insert it right before the interim span if it exists
        const interimSpan = document.getElementById('interim-span');
        if (interimSpan) {
            transcriptBox.insertBefore(p, interimSpan);
        } else {
            transcriptBox.appendChild(p);
        }
        
        // Auto-scroll
        transcriptBox.scrollTop = transcriptBox.scrollHeight;
        
        // Remove pulse after 1 second
        setTimeout(() => p.classList.remove('animate-pulse'), 1000);
    }
}); 
// 