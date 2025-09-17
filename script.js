let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("#signup-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    let emailans = emailRegex.test(email.value);
    let passans = passwordRegex.test(password.value);
    
    let isvalid = true;
    
    // Clear previous messages
    document.querySelector("#email-msg").textContent = "";
    document.querySelector("#password-msg").textContent = "";
    
    if (!emailans) {
        document.querySelector("#email-msg").textContent = "Please Enter Correct Email";
        document.querySelector("#email-msg").className = "msg error";
        isvalid = false;
    }
    
    if (!passans) {
        document.querySelector("#password-msg").textContent = "Please Enter Correct Password (8+ chars, upper, lower, digit, special)";
        document.querySelector("#password-msg").className = "msg error";
        isvalid = false;
    }
    
    if (isvalid) {
        document.querySelector("#lastMassage").style.display = "block";
        form.reset();
    }
});

const messageEl = document.getElementById('lastMassage');

// Create floating particles on hover
messageEl.addEventListener('mouseenter', () => {
    createParticles();
});

// Color change on click
messageEl.addEventListener('click', () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    messageEl.style.borderColor = randomColor;
    messageEl.style.color = randomColor;
    messageEl.style.textShadow = `
        0 0 10px ${randomColor},
        0 0 20px ${randomColor},
        0 0 30px ${randomColor},
        0 0 40px ${randomColor}
    `;
    messageEl.style.boxShadow = `
        0 0 30px ${randomColor}80,
        0 0 60px ${randomColor}60,
        0 0 120px ${randomColor}40,
        inset 0 0 30px ${randomColor}20
    `;
    
    // Flash effect
    messageEl.style.animation = 'none';
    setTimeout(() => {
        messageEl.style.animation = 'pulse 2s ease-in-out infinite alternate';
    }, 100);
});

// Double click for special effect
messageEl.addEventListener('dblclick', () => {
    messageEl.style.transform = 'scale(1.3) rotate(360deg)';
    messageEl.style.transition = 'transform 1s ease-in-out';
    
    setTimeout(() => {
        messageEl.style.transform = 'scale(1)';
    }, 1000);
});

// Create floating particles function
function createParticles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const rect = messageEl.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, i * 100);
    }
}

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        messageEl.click();
    }
});

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Limit trail length
    if (mouseTrail.length > 10) {
        mouseTrail.shift();
    }
});

// Initial welcome animation
setTimeout(() => {
    messageEl.style.transform = 'scale(1.05)';
    setTimeout(() => {
        messageEl.style.transform = 'scale(1)';
    }, 200);
}, 500);