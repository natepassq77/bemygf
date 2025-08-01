// Game state
let noClickCount = 0;
let yesButtonSize = 18;
let showSadMessage = false;
let showCelebration = false;

// Sad messages array
const sadMessages = [
    { text: "Please baby, I love you so much 🥺", emoji: "😢" },
    { text: "My heart is breaking... 💔", emoji: "😭" },
    { text: "But... but... I bought you flowers... 🌹", emoji: "🥲" },
    { text: "I promise I'll be the best boyfriend ever! 🙏", emoji: "😰" },
    { text: "Don't leave me hanging like this... 💔", emoji: "😪" },
    { text: "I'll do anything for you, my love! ❤️", emoji: "🥺" },
    { text: "Pretty please with a cherry on top? 🍒", emoji: "😢" },
    { text: "I already told my mom about you... 🙈", emoji: "😅" }
];

// DOM Elements
const welcomeOverlay = document.getElementById('welcome-overlay');
const continueBtn = document.getElementById('continue-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const sadMessageDiv = document.getElementById('sad-message');
const sadText = document.getElementById('sad-text');
const sadEmoji = document.getElementById('sad-emoji');
const initialMessage = document.getElementById('initial-message');
const celebrationOverlay = document.getElementById('celebration-overlay');
const resetBtn = document.getElementById('reset-btn');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const fireworksContainer = document.getElementById('fireworks-container');

// Initialize floating hearts
function initializeFloatingHearts() {
    const hearts = ['💗', '💕', '💖', '💝'];
    
    for (let i = 0; i < 8; i++) {
        createFloatingHeart(hearts[Math.floor(Math.random() * hearts.length)]);
    }
    
    // Add new hearts periodically
    setInterval(() => {
        createFloatingHeart(hearts[Math.floor(Math.random() * hearts.length)]);
        
        // Remove old hearts to prevent memory issues
        const allHearts = floatingHeartsContainer.children;
        if (allHearts.length > 12) {
            floatingHeartsContainer.removeChild(allHearts[0]);
        }
    }, 3000);
}

function createFloatingHeart(emoji) {
    const heart = document.createElement('div');
    heart.className = 'heart animate-float';
    heart.textContent = emoji;
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';
    floatingHeartsContainer.appendChild(heart);
}

// Fireworks function
function createFireworks() {
    const colors = ['#FF69B4', '#FFB6C1', '#DDA0DD', '#E6E6FA', '#F7CAC9'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework animate-firework';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            fireworksContainer.appendChild(firework);
            
            // Remove firework after animation
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }, i * 100);
    }
}

// Event handlers
function handleContinue() {
    welcomeOverlay.style.display = 'none';
}

function handleNoClick() {
    noClickCount++;
    showSadMessage = true;
    
    // Update yes button size
    yesButtonSize += 8;
    yesBtn.style.fontSize = yesButtonSize + 'px';
    yesBtn.style.padding = (yesButtonSize / 3) + 'px ' + (yesButtonSize / 2) + 'px';
    
    // Show sad message
    const currentMessage = sadMessages[Math.min(noClickCount - 1, sadMessages.length - 1)];
    sadText.textContent = currentMessage.text;
    sadEmoji.textContent = currentMessage.emoji;
    sadMessageDiv.classList.remove('hidden');
    
    // Hide initial message
    initialMessage.classList.add('hidden');
    
    // Scale down and fade no button
    const noButtonScale = Math.max(0.1, 1 - (noClickCount * 0.15));
    const noButtonOpacity = noClickCount >= 6 ? 0 : 1;
    
    noBtn.style.transform = `scale(${noButtonScale})`;
    noBtn.style.opacity = noButtonOpacity;
    
    if (noClickCount >= 6) {
        noBtn.style.pointerEvents = 'none';
    }
    
    // Add shake animation to no button
    noBtn.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

function handleYesClick() {
    showCelebration = true;
    celebrationOverlay.classList.remove('hidden');
    createFireworks();
}

function resetGame() {
    noClickCount = 0;
    yesButtonSize = 18;
    showSadMessage = false;
    showCelebration = false;
    
    // Reset UI
    yesBtn.style.fontSize = yesButtonSize + 'px';
    yesBtn.style.padding = (yesButtonSize / 3) + 'px ' + (yesButtonSize / 2) + 'px';
    noBtn.style.transform = 'scale(1)';
    noBtn.style.opacity = '1';
    noBtn.style.pointerEvents = 'auto';
    
    sadMessageDiv.classList.add('hidden');
    initialMessage.classList.remove('hidden');
    celebrationOverlay.classList.add('hidden');
    welcomeOverlay.style.display = 'flex';
    
    // Clear fireworks
    fireworksContainer.innerHTML = '';
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0) scale(${Math.max(0.1, 1 - (noClickCount * 0.15))}); }
    25% { transform: translateX(-10px) scale(${Math.max(0.1, 1 - (noClickCount * 0.15))}); }
    75% { transform: translateX(10px) scale(${Math.max(0.1, 1 - (noClickCount * 0.15))}); }
}
`;
document.head.appendChild(style);

// Event listeners
continueBtn.addEventListener('click', handleContinue);
yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);
resetBtn.addEventListener('click', resetGame);

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    initializeFloatingHearts();
});

// Add some extra romantic touches
function addSparkleEffect(element) {
    element.addEventListener('mouseenter', () => {
        element.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.filter = '';
    });
}

// Add sparkle effects to buttons
addSparkleEffect(yesBtn);
addSparkleEffect(continueBtn);
addSparkleEffect(resetBtn);
