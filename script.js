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

// Stały przycisk powrotu do portfolio
const backToPortfolioBtn = document.getElementById('back-to-portfolio');

function updateBackToPortfolioButton() {
    if (currentSection > 1) { // Pokazuj przycisk tylko gdy jesteśmy poza home i portfolio
        backToPortfolioBtn.classList.add('visible');
    } else {
        backToPortfolioBtn.classList.remove('visible');
    }
}

// Obsługa kliknięcia przycisku
backToPortfolioBtn.addEventListener('click', () => {
    currentSection = 1; // portfolio jest drugą sekcją (index 1)
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    updateBackToPortfolioButton();
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
        updateBackToPortfolioButton();
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        currentSection--;
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        updateBackToPortfolioButton();
    }
});

// Obsługa kliknięcia w nawigację
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('href').substring(1);
        sections.forEach((section, index) => {
            if (section.id === targetId) {
                currentSection = index;
                updateBackToPortfolioButton();
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
    updateBackToPortfolioButton();
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
        updateBackToPortfolioButton();
    }
}

// Prosta zamiana obrazków - KAŻDA GALERIA OSOBNO
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.small-images-row').forEach(smallImagesRow => {
        const smallImages = smallImagesRow.querySelectorAll('.small-img');
        
        smallImages.forEach(smallImg => {
            smallImg.addEventListener('click', function() {
                const clickedImage = this.querySelector('img');
                const mainImage = this.closest('.images-column').querySelector('.main-image img');
                
                if (mainImage && clickedImage.src) {
                    mainImage.src = clickedImage.src;
                    
                    smallImages.forEach(img => img.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    });
});

// Obsługa autoodtwarzania filmiku tylko gdy sekcja jest widoczna
document.addEventListener('DOMContentLoaded', function() {
    const fallThroneVideo = document.getElementById('fall-throne-video');
    let videoStarted = false;

    // Obserwator sprawdzający widoczność sekcji
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !videoStarted) {
                // Sekcja jest widoczna - uruchom filmik
                const videoUrl = fallThroneVideo.src + "&autoplay=1";
                fallThroneVideo.src = videoUrl;
                videoStarted = true;
            }
        });
    }, { threshold: 0.5 }); // 50% sekcji musi być widoczne

    // Obserwuj sekcję Fall Throne
    const fallThroneSection = document.getElementById('fall-throne');
    if (fallThroneSection && fallThroneVideo) {
        observer.observe(fallThroneSection);
    }
});



































