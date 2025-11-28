// auth.js - Handles Login, Register, Logout, and Route Protection

// 1. REGISTER
async function registerUser(email, password, name) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['users_db'], (data) => {
            const db = data.users_db || {};

            if (db[email]) {
                resolve({ success: false, message: "User already exists!" });
                return;
            }

            // Create new user entry
            db[email] = {
                password: password, 
                profile: { name: name, avatar: null },
                data: { notes: [], goal: "", distractions: [] } // Empty starting data
            };

            // Save to DB
            chrome.storage.local.set({ users_db: db }, () => {
                resolve({ success: true });
            });
        });
    });
}

// 2. LOGIN
async function loginUser(email, password) {
    return new Promise((resolve) => {
        chrome.storage.local.get(['users_db'], (data) => {
            const db = data.users_db || {};
            const user = db[email];

            if (user && user.password === password) {
                // SUCCESS: Load their specific data into the active extension slots
                chrome.storage.local.set({
                    currentUser: { email: email, name: user.profile.name },
                    userProfile: user.profile,
                    notes: user.data.notes,
                    goal: user.data.goal,
                    distractions: user.data.distractions
                }, () => {
                    resolve({ success: true });
                });
            } else {
                resolve({ success: false, message: "Invalid credentials." });
            }
        });
    });
}

// 3. LOGOUT
async function logoutUser() {
    return new Promise((resolve) => {
        // Save current active data back to the specific user's slot in DB before clearing
        chrome.storage.local.get(['currentUser', 'userProfile', 'notes', 'goal', 'distractions', 'users_db'], (data) => {
            if (!data.currentUser) { resolve(); return; }

            const db = data.users_db || {};
            const email = data.currentUser.email;

            // Update the DB with the latest session data
            if (db[email]) {
                db[email].profile = data.userProfile;
                db[email].data = {
                    notes: data.notes || [],
                    goal: data.goal || "",
                    distractions: data.distractions || []
                };
            }

            // Clear active session
            chrome.storage.local.set({
                users_db: db,
                currentUser: null,
                userProfile: { name: "Guest", avatar: null },
                notes: [],
                goal: "",
                distractions: []
            }, () => {
                resolve();
            });
        });
    });
}

// 4. CHECK AUTH STATE (Redirect if not logged in)
function requireAuth() {
    chrome.storage.local.get('currentUser', (data) => {
        if (!data.currentUser) {
            window.location.href = 'auth.html';
        }
    });
}