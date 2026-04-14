// Sekcje strony i logika pełnoekranowego scrolla
const sections = Array.from(document.querySelectorAll("section"));
let currentIndex = 0;
let isScrolling = false;

// Bezpieczne przewijanie do konkretnej sekcji po indeksie
function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    currentIndex = index;
    isScrolling = true;

    sections[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    updateBackToPortfolioButton();

    setTimeout(() => {
        isScrolling = false;
    }, 700);
}

// Scroll kółkiem: jedno muśnięcie = jedna sekcja
window.addEventListener(
    "wheel",
    (e) => {
        if (e.ctrlKey || e.metaKey) return;

        e.preventDefault();
        if (isScrolling) return;

        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
            scrollToSection(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            scrollToSection(currentIndex - 1);
        }
    },
    { passive: false }
);

// Strzałki góra/dół też mogą zmieniać sekcje
window.addEventListener("keydown", (e) => {
    if (isScrolling) return;

    if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
    }
});

// Płynne przewijanie po kliknięciu w linki z #
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetSection = document.querySelector(this.getAttribute("href"));
        if (!targetSection) return;

        e.preventDefault();

        const index = sections.indexOf(targetSection);
        if (index !== -1) {
            scrollToSection(index);
        } else {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Przycisk "Moje Projekty" w lewym górnym rogu
const backToPortfolioBtn = document.getElementById("back-to-portfolio");
const portfolioIndex = sections.findIndex((sec) => sec.id === "portfolio");

function updateBackToPortfolioButton() {
    if (!backToPortfolioBtn || portfolioIndex === -1) return;

    if (currentIndex > portfolioIndex) {
        backToPortfolioBtn.classList.add("visible");
    } else {
        backToPortfolioBtn.classList.remove("visible");
    }
}

if (backToPortfolioBtn && portfolioIndex !== -1) {
    backToPortfolioBtn.addEventListener("click", () => {
        scrollToSection(portfolioIndex);
    });
}

// Funkcja wywoływana z HTML: kliknięcie w kartę gry w "Moje Projekty"
function scrollToGame(gameId) {
    const targetSection = document.getElementById(gameId);
    if (!targetSection) return;

    const index = sections.indexOf(targetSection);
    if (index !== -1) {
        scrollToSection(index);
    } else {
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// Animacja pojawiania się elementów podczas scrollowania
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Dopasowane klasy do Twojego HTML
document
    .querySelectorAll(".game-card, .improved-game-layout, .skill-card")
    .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        appearObserver.observe(el);
    });

// Zamiana obrazków w galeriach
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".small-images-row").forEach((smallImagesRow) => {
        const smallImages = smallImagesRow.querySelectorAll(".small-img");

        smallImages.forEach((smallImg) => {
        smallImg.addEventListener("click", function () {
        const mainContainer = this.closest(".images-column").querySelector(".main-image");
        const type = this.dataset.type || "image";
        const src = this.dataset.src || this.querySelector("img")?.src;

        if (!mainContainer || !src) return;

        if (type === "video") {
            mainContainer.innerHTML = `
                <video autoplay muted loop playsinline controls>
                    <source src="${src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            mainContainer.innerHTML = `
                <img src="${src}" alt="Preview">
            `;
        }

        smallImages.forEach((img) => img.classList.remove("active"));
        this.classList.add("active");
    });
});

// Autoodtwarzanie filmiku dla Fall Throne
document.addEventListener("DOMContentLoaded", function () {
    const fallThroneVideo = document.getElementById("fall-throne-video");
    let videoStarted = false;

    if (!fallThroneVideo) return;

    const fallThroneSection = document.getElementById("fall-throne");
    if (!fallThroneSection) return;

    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !videoStarted) {
                    const videoUrl = fallThroneVideo.src + "&autoplay=1";
                    fallThroneVideo.src = videoUrl;
                    videoStarted = true;
                }
            });
        },
        { threshold: 0.5 }
    );

    videoObserver.observe(fallThroneSection);
});

// Startowe ustawienie
window.addEventListener("load", () => {
    currentIndex = 0;
    updateBackToPortfolioButton();
});

