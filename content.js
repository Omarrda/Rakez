// --- Create a host element and attach a shadow root ---
const shadowHost = document.createElement('div');
shadowHost.id = 'rakez-shadow-host';
document.body.appendChild(shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// --- Inject Font Awesome into the shadow DOM ---
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
shadowRoot.appendChild(fontAwesomeLink);

// --- Inject the extension's stylesheet into the shadow DOM ---
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = chrome.runtime.getURL('style.css');
shadowRoot.appendChild(styleLink);


// --- UI Components ---

// 1. Create the container for the nudge
const nudge = document.createElement('div');
nudge.id = 'rakez-nudge-overlay';
nudge.style.display = 'none'; // Initially hidden
nudge.innerHTML = `
  <div class="rakez-nudge-box">
    <div class="rakez-nudge-header">
        <img src="${chrome.runtime.getURL('rakezgreytransparentcropped.png')}" alt="Rakez Logo">
        <h3>Rakez Focus Coach</h3>
    </div>
    <div class="rakez-nudge-content">
        <h4>Are you staying on task?</h4>
        <p>This page doesn't seem related to your goal: <strong id="rakez-goal-display">your goal</strong></p>
    </div>
    <div class="rakez-nudge-buttons">
        <button id="rk-no" class="btn-primary-nudge">Save for Later</button>
        <button id="rk-yes" class="btn-secondary-nudge">I'm on Task</button>
    </div>
  </div>
`;
shadowRoot.appendChild(nudge);

// 2. Create the Active Assistant components
const assistantButton = document.createElement('button');
assistantButton.id = 'rakez-assistant-button';
assistantButton.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
shadowRoot.appendChild(assistantButton);

const assistantSidebar = document.createElement('iframe');
assistantSidebar.id = 'rakez-assistant-sidebar';
assistantSidebar.src = chrome.runtime.getURL('assistant.html');
shadowRoot.appendChild(assistantSidebar);

// 3. Create the Study Sidecar components
const sidecarButton = document.createElement('button');
sidecarButton.id = 'rakez-sidecar-button';
sidecarButton.innerHTML = `<i class="fa-solid fa-pen-nib"></i>`;
shadowRoot.appendChild(sidecarButton);

const sidecarPanel = document.createElement('div');
sidecarPanel.id = 'rakez-sidecar-panel';
sidecarPanel.innerHTML = `
    <div class="sidecar-header">
        <h3>Study Sidecar</h3>
    </div>
    <textarea id="rakez-sidecar-textarea" placeholder="Your notes..."></textarea>
    <div class="sidecar-footer">
        <button id="rakez-timestamp-btn"><i class="fa-solid fa-clock"></i> Timestamp</button>
        <button id="rakez-save-note-btn"><i class="fa-solid fa-save"></i> Save</button>
    </div>
`;
shadowRoot.appendChild(sidecarPanel);


// --- Logic and Event Listeners ---

// Fetch the goal from storage and update the nudge UI
chrome.storage.local.get('goal', (data) => {
    if (data.goal) {
        const goalDisplay = shadowRoot.getElementById('rakez-goal-display');
        if (goalDisplay) {
            goalDisplay.textContent = data.goal;
        }
    }
});

// Nudge button logic
shadowRoot.getElementById('rk-yes').addEventListener('click', () => {
    nudge.style.display = 'none';
});

shadowRoot.getElementById('rk-no').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'saveDistraction', url: window.location.href });
    chrome.runtime.sendMessage({ action: 'closeTab' }); 
});

// Active Assistant toggle logic
assistantButton.addEventListener('click', () => {
    assistantSidebar.classList.toggle('visible');
});

// Study Sidecar toggle logic
sidecarButton.addEventListener('click', () => {
    sidecarPanel.classList.toggle('visible');
});

// Timestamp logic
shadowRoot.getElementById('rakez-timestamp-btn').addEventListener('click', () => {
    const videos = Array.from(document.querySelectorAll('video'));
    if (videos.length === 0) return;

    // Find the largest video on the page (likely the main one)
    const mainVideo = videos.reduce((prev, current) => {
        return (prev.offsetWidth * prev.offsetHeight > current.offsetWidth * current.offsetHeight) ? prev : current;
    });

    if (mainVideo) {
        const currentTime = Math.floor(mainVideo.currentTime);
        const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
        const seconds = (currentTime % 60).toString().padStart(2, '0');
        const timestamp = `[${minutes}:${seconds}] `;
        const textarea = shadowRoot.getElementById('rakez-sidecar-textarea');
        textarea.value += timestamp;
        textarea.focus();
    }
});

// Save note logic
shadowRoot.getElementById('rakez-save-note-btn').addEventListener('click', () => {
    const noteContent = shadowRoot.getElementById('rakez-sidecar-textarea').value;
    if (noteContent.trim() !== '') {
        const note = {
            type: 'user_note',
            content: noteContent,
            source: {
                title: document.title,
                url: window.location.href
            },
            timestamp: new Date().toISOString()
        };
        chrome.storage.local.get({notes: []}, (data) => {
            const notes = data.notes;
            notes.push(note);
            chrome.storage.local.set({ notes }, () => {
                shadowRoot.getElementById('rakez-sidecar-textarea').value = ''; // Clear textarea
                sidecarPanel.classList.remove('visible'); // Hide panel
            });
        });
    }
});


// --- AI-Powered Nudge Logic ---
let hasNudgeBeenShown = false;

function showNudge() {
    if (!hasNudgeBeenShown) {
        nudge.style.display = 'flex';
        hasNudgeBeenShown = true;
    }
}

function getPageContent() {
    // A simple way to get the main content of the page
    return document.body.innerText;
}

function getVideoTranscript() {
    const hostname = window.location.hostname;
    let transcriptElements;

    if (hostname.includes('youtube.com')) {
        transcriptElements = document.querySelectorAll('ytd-transcript-segment-renderer yt-formatted-string');
    } else if (hostname.includes('udemy.com')) {
        // Udemy selector needs to be identified by a developer
        transcriptElements = document.querySelectorAll('[data-purpose="transcript-cue-text"]');
    } else if (hostname.includes('coursera.org')) {
        // Coursera selector needs to be identified by a developer
        transcriptElements = document.querySelectorAll('.rc-Phrase');
    }

    if (transcriptElements && transcriptElements.length > 0) {
        return Array.from(transcriptElements).map(el => el.textContent).join(' ');
    }
    return '';
}

function triggerRelevanceCheck() {
    let content = getPageContent() + '\n\n' + getVideoTranscript();
    if (content.length > 200) {
        chrome.runtime.sendMessage({ action: 'checkRelevance', content: content }, (response) => {
            if (response && !response.isRelevant) {
                showNudge();
            }
        });
    }
}

// Use MutationObserver to wait for transcripts to load on video sites
const hostname = window.location.hostname;
if (hostname.includes('youtube.com') || hostname.includes('udemy.com') || hostname.includes('coursera.org')) {
    const observer = new MutationObserver((mutations, obs) => {
        // A simple check to see if the transcript might be loaded
        if (document.body.innerText.length > 500) {
            triggerRelevanceCheck();
            obs.disconnect(); // Stop observing once we have content
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    // For non-video pages, check immediately
    triggerRelevanceCheck();
}

// --- Active Assistant Message Listener ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Helper function to create the message object
    const createMessage = (action, content) => ({
        action: action,
        content: content,
        title: document.title,
        url: window.location.href
    });

    const pageContent = getPageContent() + '\\n\\n' + getVideoTranscript();

    if (request.action === "getSummary") {
        chrome.runtime.sendMessage(createMessage('getSummary', pageContent), (response) => {
            sendResponse({ summary: response.summary });
        });
        return true;
    } else if (request.action === "getDefinitions") {
        chrome.runtime.sendMessage(createMessage('getDefinitions', pageContent), (response) => {
            sendResponse({ definitions: response.definitions });
        });
        return true;
    } else if (request.action === "getQuiz") {
        chrome.runtime.sendMessage(createMessage('getQuiz', pageContent), (response) => {
            sendResponse({ quiz: response.quiz });
        });
        return true;
    }
});
