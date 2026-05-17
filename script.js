// Modal Functions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    alert('Bienvenue sur Musicaa! Vous êtes maintenant connecté. 🎵');
    closeLoginModal();
}

// Fermer la modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Player Functionality
const playBtn = document.querySelector('.play-btn');
const progressInput = document.querySelector('.progress-input');
const volumeSlider = document.querySelector('.volume-slider');
let isPlaying = false;

if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? '⏸️' : '▶️';
        playBtn.style.animation = isPlaying ? 'pulse 1s infinite' : 'none';
    });
}

if (progressInput) {
    progressInput.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #282828 ${value}%, #282828 100%)`;
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #282828 ${value}%, #282828 100%)`;
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer pour les cartes
document.querySelectorAll('.feature-card, .song-card, .playlist-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Pulse animation for playing
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Play button functionality for songs
document.querySelectorAll('.btn-play').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const songTitle = this.parentElement.querySelector('h4').textContent;
        const artistName = this.parentElement.querySelector('p').textContent;
        
        // Update player
        document.querySelector('.song-title').textContent = songTitle;
        document.querySelector('.artist-name').textContent = artistName;
        
        // Auto play
        playBtn.textContent = '⏸️';
        isPlaying = true;
        playBtn.style.animation = 'pulse 1s infinite';
        
        // Scroll to player
        document.querySelector('.player-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (playBtn) {
            playBtn.click();
        }
    }
});

console.log('%c🎵 Bienvenue sur Musicaa!', 'color: #1DB954; font-size: 20px; font-weight: bold;');
console.log('%cMusique gratuite, sans pub, pour tous!', 'color: #1DB954; font-size: 14px;');