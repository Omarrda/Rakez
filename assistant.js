document.addEventListener('DOMContentLoaded', () => {
    const summarizeBtn = document.getElementById('summarize-btn');
    const defineBtn = document.getElementById('define-btn');
    const quizBtn = document.getElementById('quiz-btn');
    const resultsContainer = document.getElementById('ai-results-container');

    function showLoading() {
        resultsContainer.innerHTML = '<div class="loader"></div>';
    }

    function showResult(content) {
        resultsContainer.innerHTML = `<p>${content}</p>`;
    }
    
    summarizeBtn.addEventListener('click', () => {
        showLoading();
        // The active tab's content script will receive this message
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getSummary" }, (response) => {
                if (response && response.summary) {
                    showResult(response.summary);
                } else {
                    showResult('Could not summarize this page.');
                }
            });
        });
    });

    defineBtn.addEventListener('click', () => {
        showLoading();
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getDefinitions" }, (response) => {
                if (response && response.definitions) {
                    showResult(response.definitions);
                } else {
                    showResult('Could not define terms on this page.');
                }
            });
        });
    });

    quizBtn.addEventListener('click', () => {
        showLoading();
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getQuiz" }, (response) => {
                if (response && response.quiz) {
                    showResult(response.quiz);
                } else {
                    showResult('Could not generate a quiz for this page.');
                }
            });
        });
    });
});
