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

// Podgląd obrazków - bez zamiany miejscami
document.querySelectorAll('.small-img').forEach(smallImg => {
    smallImg.addEventListener('click', function() {
        const smallImgSrc = this.querySelector('img').src;
        const mainImage = this.closest('.images-column').querySelector('.main-image img');
        
        if (mainImage && smallImgSrc) {
            // Tylko zmiana głównego obrazka - bez zamiany
            mainImage.src = smallImgSrc;
            
            // Podświetlenie aktywnego obrazka
            document.querySelectorAll('.small-img').forEach(img => img.classList.remove('active'));
            this.classList.add('active');
        }
    });
});















