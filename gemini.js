// Function to get the API key from storage
async function getApiKey() {
    return new Promise((resolve) => {
        chrome.storage.sync.get('geminiApiKey', (data) => {
            resolve(data.geminiApiKey);
        });
    });
}

// A centralized function to call the Gemini API
async function callGeminiAPI(prompt) {
    const apiKey = await getApiKey();
    if (!apiKey) {
        console.error('Gemini API key is not set. Please set it in the settings page.');
        return null; // Return null or a specific error message
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const headers = { 'Content-Type': 'application/json' };
    const body = { contents: [{ parts: [{ text: prompt }] }] };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Gemini API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return null; // Return null on error
    }
}


async function isContentRelevant(content, goal) {
    const apiKey = await getApiKey();
    if (!apiKey) {
        // Mock functionality if no key is present
        return !content.toLowerCase().includes('dunk');
    }
    
    const prompt = `Analyze the following content and determine if it is relevant to the user's study goal: "${goal}". Respond with "true" if it is relevant and "false" if it is not.\n\nContent:\n${content}`;
    const result = await callGeminiAPI(prompt);
    return result ? result.toLowerCase() === 'true' : false;
}

async function getSummary(content) {
    const apiKey = await getApiKey();
    if (!apiKey) { return "API key not set. This is a mock summary."; }
    const prompt = `Summarize the following content in 3 bullet points:\n\n${content}`;
    return await callGeminiAPI(prompt);
}

async function getDefinitions(content) {
    const apiKey = await getApiKey();
    if (!apiKey) { return "API key not set. This is a mock definition."; }
    const prompt = `Identify and define up to 3 complex jargon terms from the following content. Format the output as simple HTML using <b> for the term and <br> for line breaks:\n\n${content}`;
    return await callGeminiAPI(prompt);
}

async function getQuiz(content) {
    const apiKey = await getApiKey();
    if (!apiKey) { return "API key not set. This is a mock quiz."; }
    const prompt = `Generate 3 active-recall questions based on the following content. Format the output as a simple numbered list in HTML using <br> for line breaks:\n\n${content}`;
    return await callGeminiAPI(prompt);
}
