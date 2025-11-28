// utils.js - Helper functions for UI (Avatars, Colors)

/**
 * Generates a unique color based on the name string.
 */
function getAvatarColor(name) {
    const colors = [
        '#2A9D8F', // Teal
        '#E76F51', // Burnt Orange
        '#264653', // Dark Blue
        '#E9C46A', // Gold
        '#F4A261', // Orange
        '#457B9D', // Steel Blue
        '#D62828', // Red
        '#1D3557', // Navy
    ];
    const charCode = name ? name.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
}

/**
 * Renders the avatar into a specific HTML element.
 * Use this in Options.html and Settings.html
 */
function renderAvatar(element, name, avatarBase64) {
    if (avatarBase64) {
        // Render Image
        element.innerHTML = `<img src="${avatarBase64}" style="width:100%; height:100%; object-fit:cover;" alt="Avatar">`;
        element.style.backgroundColor = 'transparent';
        element.textContent = ''; 
    } else {
        // Render Initials with Unique Color
        const validName = name || "User";
        const initials = validName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        element.innerHTML = ''; 
        element.textContent = initials;
        element.style.backgroundColor = getAvatarColor(validName);
        element.style.color = '#FFFFFF';
        // Ensure flex centering is applied by CSS class, but we can enforce it:
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
    }
}