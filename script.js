// Płynne przewijanie do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Wyłącz normalny scroll
document.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

// Scroll snapping - TYLKO między sekcjami
let isScrolling = false;
let currentSection = 0;
const sections = document.querySelectorAll('section');

// Obsługa scrolla - TYLKO zmiana sekcji
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll w dół - następna sekcja
        currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll w górę - poprzednia sekcja
        currentSection--;
    }
    
    // Przewijanie do sekcji
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Reset flagi po zakończeniu animacji
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

// Obsługa klawiszy strzałek
window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        currentSection++;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        currentSection--;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Obsługa kliknięcia w nawigację
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('href').substring(1);
        sections.forEach((section, index) => {
            if (section.id === targetId) {
                currentSection = index;
            }
        });
    });
});

// Animacja pojawiania się elementów podczas scrollowania
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Obserwowanie elementów do animacji
document.querySelectorAll('.game-card, .game-detail-container, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Inicjalne ustawienie
window.addEventListener('load', () => {
    currentSection = 0;
});

// Funkcja do pokazywania szczegółów gry
function showGameDetail(gameId) {
    // Ukryj wszystkie sekcje gier
    document.querySelectorAll('.game-detail-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Pokaż wybraną sekcję
    const targetSection = document.getElementById(gameId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Aktualizuj currentSection dla scroll snapping
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (section.id === gameId) {
                currentSection = index;
            }
        });
    }
}

// Proste przewijanie do sekcji gry
function scrollToGame(gameId) {
    const targetSection = document.getElementById(gameId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Aktualizuj currentSection dla scroll snapping
        sections.forEach((section, index) => {
            if (section.id === gameId) {
                currentSection = index;
            }
        });
    }
}

// Obsługa kliknięcia w kartę gry
document.querySelectorAll('.game-card').forEach(card => {
    card.style.cursor = 'pointer';
});

// Efekt Matrix
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrix-bg');
    const chars = '01010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ$$$%%%&&&***';
    
    function createChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDuration = (Math.random() * 2 + 1) + 's'; /* szybsze */
        char.style.opacity = Math.random() * 0.7 + 0.3;
        char.style.fontSize = (Math.random() * 6 + 14) + 'px'; /* różne rozmiary */
        
        matrixBg.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 3000);
    }
    
    // Więcej znaków
    setInterval(createChar, 50);
    
    for (let i = 0; i < 100; i++) {
        setTimeout(createChar, i * 50);
    }
}









