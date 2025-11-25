importScripts('gemini.js');

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    goal: 'Learn about web development',
    notes: [],
    distractions: [],
    focusScore: 0,
    streaks: 0
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveDistraction') {
    chrome.storage.local.get('distractions', (data) => {
      const distractions = data.distractions || [];
      distractions.push(request.url);
      chrome.storage.local.set({ distractions });
    });
  } else if (request.action === 'closeTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
  } else if (request.action === 'checkRelevance') {
    chrome.storage.local.get('goal', async (data) => {
        if (data.goal) {
            console.log("Checking relevance with Gemini API...");
            const isRelevant = await isContentRelevant(request.content, data.goal);
            sendResponse({ isRelevant });
        }
    });
    return true; // Indicates that the response is sent asynchronously
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
                });
            }
            sendResponse({ definitions });
        });
        return true;
  } else if (request.action === 'getQuiz') {
        getQuiz(request.content).then(quiz => sendResponse({ quiz }));
        return true;
  }
});
