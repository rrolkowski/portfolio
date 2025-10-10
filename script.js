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

// Ulepszony scroll snapping
let isScrolling = false;
let currentSection = 0;
const sections = document.querySelectorAll('section');
const scrollThreshold = 50; // Minimalny scroll aby zmienić sekcję

// Funkcja do zmiany sekcji
function goToSection(index) {
    if (index >= 0 && index < sections.length) {
        currentSection = index;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Obsługa scrolla
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    
    // Sprawdzamy kierunek scrolla i czy przekroczono próg
    if (e.deltaY > scrollThreshold && currentSection < sections.length - 1) {
        // Scroll w dół - następna sekcja
        goToSection(currentSection + 1);
    } else if (e.deltaY < -scrollThreshold && currentSection > 0) {
        // Scroll w górę - poprzednia sekcja
        goToSection(currentSection - 1);
    }
    
    // Reset flagi po zakończeniu animacji
    setTimeout(() => {
        isScrolling = false;
    }, 800);
});

// Obsługa klawiszy strzałek
window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        goToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        goToSection(currentSection - 1);
    }
});

// Obsługa kliknięcia w nawigację
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('href').substring(1);
        sections.forEach((section, index) => {
            if (section.id === targetId) {
                goToSection(index);
            }
        });
    });
});

// Aktualizacja currentSection podczas manualnego scrolla
window.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = index;
        }
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
