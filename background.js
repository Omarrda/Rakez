importScripts('gemini.js');

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    goal: 'Learn about web development',
    notes: [],
    distractions: [],
    focusScore: 100,
    sessionEvents: [],
    // Initialize default user profile
    userProfile: {
        name: "Rakez User",
        initials: "RU",
        avatar: null // Will hold the Base64 image string
    }
  });
});

function updateStats(type) {
    chrome.storage.local.get(['focusScore', 'sessionEvents'], (data) => {
        let score = data.focusScore || 100;
        let events = data.sessionEvents || [];
        
        if (type === 'positive') score = Math.min(100, score + 2);
        if (type === 'negative') score = Math.max(0, score - 5);
        
        events.push({ type: type, timestamp: new Date().toISOString() });
        chrome.storage.local.set({ focusScore: score, sessionEvents: events });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveDistraction') {
    chrome.storage.local.get('distractions', (data) => {
      const distractions = data.distractions || [];
      distractions.push(request.url);
      chrome.storage.local.set({ distractions });
      updateStats('negative');
    });
  } else if (request.action === 'closeTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) chrome.tabs.remove(tabs[0].id);
    });
  } else if (request.action === 'checkRelevance') {
    chrome.storage.local.get('goal', async (data) => {
        if (data.goal) {
            const isRelevant = await isContentRelevant(request.content, data.goal);
            sendResponse({ isRelevant });
            if (!isRelevant) updateStats('negative');
        }
    });
    return true; 
  } else if (request.action === 'getSummary') {
        getSummary(request.content).then(summary => {
            if (summary) {
                const note = {
                    type: 'ai_summary',
                    content: summary,
                    source: { title: request.title, url: request.url },
                    timestamp: new Date().toISOString()
                };
                chrome.storage.local.get({notes: []}, (data) => {
                    data.notes.push(note);
                    chrome.storage.local.set({ notes: data.notes });
                    updateStats('positive');
                });
            }
            sendResponse({ summary });
        });
        return true;
  } else if (request.action === 'getDefinitions') {
        getDefinitions(request.content).then(definitions => {
            if (definitions) {
                const note = {
                    type: 'ai_definitions',
                    content: definitions,
                    source: { title: request.title, url: request.url },
                    timestamp: new Date().toISOString()
                };
                chrome.storage.local.get({notes: []}, (data) => {
                    data.notes.push(note);
                    chrome.storage.local.set({ notes: data.notes });
                    updateStats('positive');
                });
            }
            sendResponse({ definitions });
        });
        return true;
  } else if (request.action === 'getQuiz') {
        getQuiz(request.content).then(quiz => sendResponse({ quiz }));
        return true;
  } else if (request.action === 'generateComprehensiveQuiz') {
      chrome.storage.local.get({notes: []}, async (data) => {
          const recentNotes = data.notes.slice(-10).map(n => n.content).join('\n');
          if (!recentNotes) {
              sendResponse({ quiz: "No notes found to generate a quiz." });
              return;
          }
          const prompt = `Based on these notes, generate 3 multiple choice questions. Format: Question? A) ... B) ... C) ... Answer: X. \n\nNotes:\n${recentNotes}`;
          const quiz = await callGeminiAPI(prompt);
          sendResponse({ quiz });
      });
      return true;
  }
});