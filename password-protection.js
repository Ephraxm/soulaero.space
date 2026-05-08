// Password Protection System
const CORRECT_PASSWORD = "soulaero"; // Change this to your desired password

// Hide all content by default (except overlay)
function hideAllContent() {
    // Create a blocker div that covers everything
    let blocker = document.getElementById('content-blocker');
    if (!blocker) {
        blocker = document.createElement('div');
        blocker.id = 'content-blocker';
        blocker.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9998;
            pointer-events: auto;
        `;
        document.body.appendChild(blocker);
    }
}

// Show all content after authentication
function showAllContent() {
    const blocker = document.getElementById('content-blocker');
    if (blocker) {
        blocker.style.opacity = '0';
        blocker.style.pointerEvents = 'none';
        setTimeout(() => blocker.remove(), 500);
    }
}

function initPasswordProtection() {
    // Hide content immediately
    hideAllContent();
    
    // Check if already authenticated in this session
    if (sessionStorage.getItem('siteAuthenticated') === 'true') {
        showAllContent();
        return;
    }

    // Create and show password overlay
    showPasswordOverlay();
}

function showPasswordOverlay() {
    // Create overlay with animated background
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-45deg, #1a1a1a, #2d2d2d, #1a1a1a, #2d2d2d);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 40px 20px;
    `;

    // Create Instagram link at top
    const instagramLink = document.createElement('a');
    instagramLink.href = 'https://www.instagram.com/soulaer_o/';
    instagramLink.target = '_blank';
    instagramLink.rel = 'noopener noreferrer';
    instagramLink.textContent = '@soulaero';
    instagramLink.style.cssText = `
        position: absolute;
        top: 30px;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        animation: fadeIn 1s ease-out 0s both;
        cursor: pointer;
    `;

    instagramLink.addEventListener('mouseover', function() {
        this.style.color = 'rgba(255, 255, 255, 1)';
        this.style.transform = 'scale(1.05)';
    });

    instagramLink.addEventListener('mouseout', function() {
        this.style.color = 'rgba(255, 255, 255, 0.8)';
        this.style.transform = 'scale(1)';
    });

    overlay.appendChild(instagramLink);

    // Create container for glass effect
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 20px;
        animation: fadeInUp 0.8s ease-out;
        align-items: center;
    `;

    // Create password input with glass effect
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
        animation: fadeIn 1s ease-out 0.2s both;
    `;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password-input';
    passwordInput.placeholder = '';
    passwordInput.autoFocus = true;
    passwordInput.style.cssText = `
        width: 280px;
        padding: 16px 20px;
        font-size: 16px;
        border: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: white;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        outline: none;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.18);
    `;

    passwordInput.addEventListener('focus', function() {
        this.style.background = 'rgba(255, 255, 255, 0.15)';
        this.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.5)';
    });

    passwordInput.addEventListener('blur', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
    });

    // Add placeholder styling
    const style = document.createElement('style');
    style.textContent = `
        #password-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
    `;
    document.head.appendChild(style);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    inputContainer.appendChild(passwordInput);

    // Create button with glass effect
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        animation: fadeIn 1s ease-out 0.4s both;
        text-align: center;
    `;

    const button = document.createElement('button');
    button.textContent = 'Enter';
    button.onclick = checkPassword;
    button.style.cssText = `
        width: 120px;
        padding: 10px 16px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: white;
        cursor: pointer;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: all 0.3s ease;
    `;

    button.addEventListener('mouseover', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.5)';
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseout', function() {
        this.style.background = 'rgba(255, 255, 255, 0.15)';
        this.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
        this.style.transform = 'translateY(0)';
    });

    // Create error message
    const errorMsg = document.createElement('p');
    errorMsg.id = 'error-msg';
    errorMsg.style.cssText = `
        color: #ff6b6b;
        font-size: 13px;
        text-align: center;
        min-height: 18px;
        margin: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    buttonContainer.appendChild(button);
    container.appendChild(inputContainer);
    container.appendChild(buttonContainer);
    container.appendChild(errorMsg);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    // Focus on input after render
    requestAnimationFrame(() => {
        passwordInput.focus();
        passwordInput.select();
    });
}

function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    
    if (input.value === CORRECT_PASSWORD) {
        // Double-verify authentication
        sessionStorage.setItem('siteAuthenticated', 'true');
        localStorage.setItem('_auth_check', Date.now().toString());
        removePasswordOverlay();
    } else {
        errorMsg.textContent = 'Incorrect password';
        errorMsg.style.opacity = '1';
        input.value = '';
        
        // Shake animation
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.4s ease-in-out';
        }, 10);
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorMsg.style.opacity = '0';
        }, 3000);
    }
}

function removePasswordOverlay() {
    const overlay = document.getElementById('password-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
            showAllContent();
        }, 500);
    }
}

// Monitor for modal deletion or tampering
function monitorPasswordProtection() {
    const observer = new MutationObserver(() => {
        const isAuthenticated = sessionStorage.getItem('siteAuthenticated') === 'true';
        const hasOverlay = document.getElementById('password-overlay') !== null;
        const hasBlocker = document.getElementById('content-blocker') !== null;
        
        // If NOT authenticated and overlay was deleted, recreate it
        if (!isAuthenticated && !hasOverlay) {
            hideAllContent();
            showPasswordOverlay();
        }
        
        // If authenticated but overlay still exists, remove it
        if (isAuthenticated && hasOverlay) {
            document.getElementById('password-overlay').remove();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Additional protection: disable right-click and common developer tools shortcuts
document.addEventListener('contextmenu', (e) => {
    if (sessionStorage.getItem('siteAuthenticated') !== 'true') {
        e.preventDefault();
    }
});

document.addEventListener('keydown', (e) => {
    if (sessionStorage.getItem('siteAuthenticated') !== 'true') {
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J')) {
            e.preventDefault();
        }
    }
});


// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
    }
`;
document.head.appendChild(style);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPasswordProtection();
        monitorPasswordProtection();
    });
} else {
    initPasswordProtection();
    monitorPasswordProtection();
}
