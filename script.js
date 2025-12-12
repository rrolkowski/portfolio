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
                const clickedImage = this.querySelector("img");
                const mainImage = this.closest(".images-column").querySelector(".main-image img");

                if (mainImage && clickedImage && clickedImage.src) {
                    mainImage.src = clickedImage.src;

                    smallImages.forEach((img) => img.classList.remove("active"));
                    this.classList.add("active");
                }
            });
        });
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

const i18n = {
    pl: {
        "nav.myProjects": "Moje Projekty",

        "home.about": "Specjalizuję się jako Gameplay Programmer z pasją do AI w grach. Pracuję głównie w Unity, pisząc kod w C#. Moje doświadczenie obejmuje projektowanie mechanik gracza, przeciwników AI oraz systemów nawigacji.",
        "home.cta": "Zobacz moje projekty",

        "portfolio.title": "Moje Projekty",

        "card.laserDefender": "Klasyczny space shooter 2D",
        "card.ootm": "Niekończąca się gra zręcznościowa",
        "card.fallThrone": "Tower defense gdzie można przenosić wszystko!",
        "card.mechanics": "Kolekcja moich mechanik rozgrywki do gry hack-and-slash",

        "common.featuresBuilt": "Stworzone funkcje:",
        "common.mechanicsBuilt": "Stworzone mechaniki:",
        "common.myRole": "Moja rola:",
        "common.scopeOfWork": "Zakres prac:",
        "common.rights": "Wszystkie prawa zastrzeżone.",

        "laser.desc": "Laser Defender to klasyczny space shooter 2D, w którym sterujesz statkiem kosmicznym, eliminujesz fale wrogów i zbierasz punkty",
        "laser.f1": "Stworzyłem logikę sterowania statkiem gracza",
        "laser.f2": "Zaimplementowałem przeciwników z czasowym wyprowadzaniem ataków",
        "laser.f3": "Zaprogramowałem system fal przeciwników z rosnącym poziomem trudności",
        "laser.f4": "Zoptymalizowałem wydajność dla płynnej rozgrywki na PC oraz na urządzenia mobilne",
        "laser.f5": "Stworzyłem grafikę i VFX",
        "laser.f6": "Zaprojektowałem interfejs użytkownika",

        "ootm.desc": "Niekończąca się gra zręcznościowa typu runner, której motywem jest szpital psychiatryczny.",
        "ootm.f1": "Zaprojektowałem i zaimplementowałem główne mechaniki endless runnera.",
        "ootm.f2": "Opracowałem system spawnu przeciwników oparty na detekcji ilości obiektów w jednej lini.",
        "ootm.f3": "Zaimplementowałem system punktacji opartą na czasie. (wynik punktów w metrach)",
        "ootm.f4": "Zoptymalizowałem wydajność gry dla płynnego działania w Unity.",
        "ootm.f5": "Stworzyłem mechanikę boosta opartą na zbieraniu strzykawek i aktywacji czasowych bonusów.",
        "ootm.f6": "Stworzyłem oprawę graficzną w klimacie szpitala psychiatrycznego, wzmacniającą atmosferę rozgrywki.",

        "fall.desc": "Gra typu Tower Defense, w której możesz nosić wszystko!",
        "fall.f1": "Stworzyłem system pathfindingu oparty na algorytmie A, zintegrowany z Tilemap, umożliwiający dynamiczne wyznaczanie tras.",
        "fall.f2": "Stworzyłem różnorodne mechaniki ataków wież, obejmujące odmienne style obrażeń i logikę celowania.",
        "fall.f3": "Zaimplementowałem systemy UI oraz mechaniki życia, ekonomii i zarządzania wieżami.",
        "fall.f4": "Stworzyłem system „grab & throw”, w której można podnosić wyznaczone przedmioty oraz nimi rzucać.",
        "fall.f5": "Udoskonaliłem „grab & throw” z zapamiętywaniem ostatniej ścieżki ruchu przeciwnika po wyrzuceniu.",
        "fall.f6": "Stworzyłem system power-upów wpływających na statystyki gracza.",
        "fall.f7": "Zaimplementowałem system staminy z dynamiczną regeneracją i kosztami akcji.",

        "welcome.desc": "Gra oferująca interakcję z otoczeniem, kontrolę ekranów oraz rozgrywkę skoncentrowaną na eliminowaniu wirusa...",
        "welcome.role1": "Programista Unity (C#) odpowiedzialny za implementację mechanik rozgrywki, wsparcie procesu prototypowania.",
        "welcome.s1": "Tworzenie i rozwój elementów gameplayu",
        "welcome.s2": "Praca z eventami i ScriptableObjects do modularnego zarządzania logiką i danymi.",
        "welcome.s3": "Tworzenie i modyfikacja shaderów w HLSL",
        "welcome.s4": "Pisanie modularnego i skalowalnego kodu w C#",
        "welcome.s5": "Praca zespołowa z użyciem Plastic SCM",
        "welcome.link": "Strona \"Welcome User\"",

        "mech.f1": "Stworzyłem system życia, many i staminy z możliwością ulepszania statystyk oraz systemem mikstur przywracających zasoby.",
        "mech.f2": "Stworzyłem system statystyk (HP, CRIT, Movement Speed, Attack Power, Max Stamina, Max Mana) połączony z mechaniką levelowania.",
        "mech.f3": "Stworzyłem system umiejętności inspirowany mechaniką działania z \"League of Legends\".",
        "mech.f4": "Stworzyłem AI bossa z różnymi zestawami ataków, reagujące dynamicznie na działania gracza.",
        "mech.f5": "Stworzyłem kapliczkę dającą losowe, czasowe wzmocnienia po aktywacji. Inspirowana kapliczką/ołtarzem z \"Path of Exile\".",
        "mech.f6": "Stworzyłem system uniku (roll) oraz obsługę ataków z dynamiczną zmianą broni.",
        "mech.f7": "Stworzyłem system questów o modularnej budowie, umożliwiający łatwe projektowanie i dodawanie nowych zadań do gry.",
        "mech.f8": "Stworzyłem ekrany UI pokazujące na bieżąco statystyki gracza, levelowanie, umiejętności i questy."
    },

    en: {
        "nav.myProjects": "My Projects",

        "home.about": "I specialize as a Gameplay Programmer with a strong passion for game AI. I primarily work in Unity using C#. My experience includes designing player mechanics, enemy AI, and navigation systems.",
        "home.cta": "See my projects",

        "portfolio.title": "My Projects",

        "card.laserDefender": "A classic 2D space shooter",
        "card.ootm": "An endless arcade runner",
        "card.fallThrone": "A tower defense where you can carry anything!",
        "card.mechanics": "A collection of my hack-and-slash gameplay mechanics",

        "common.featuresBuilt": "Features I built:",
        "common.mechanicsBuilt": "Mechanics I built:",
        "common.myRole": "My role:",
        "common.scopeOfWork": "Scope of work:",
        "common.rights": "All rights reserved.",

        "laser.desc": "Laser Defender is a classic 2D space shooter where you pilot a spaceship, defeat waves of enemies, and score points.",
        "laser.f1": "Built the player ship control and movement logic",
        "laser.f2": "Implemented enemies with timed attack patterns",
        "laser.f3": "Developed a wave system with progressively increasing difficulty",
        "laser.f4": "Optimized performance for smooth gameplay on PC and mobile devices",
        "laser.f5": "Created the visuals and VFX",
        "laser.f6": "Designed and implemented the user interface",

        "ootm.desc": "An endless runner type arcade game with a psychiatric hospital theme.",
        "ootm.f1": "Designed and implemented the core endless runner mechanics",
        "ootm.f2": "Developed an enemy spawn system based on detecting the number of objects in a lane",
        "ootm.f3": "Implemented a time-based scoring system (distance measured in meters)",
        "ootm.f4": "Optimized overall performance for smooth gameplay in Unity",
        "ootm.f5": "Built a boost mechanic based on collecting syringes and activating timed bonuses",
        "ootm.f6": "Created the psychiatric-hospital themed art style to strengthen the atmosphere",

        "fall.desc": "A Tower Defense game where you can carry anything!"
        "fall.f1": "Built an A* pathfinding system integrated with Tilemap to support dynamic route calculation",
        "fall.f2": "Created multiple tower attack mechanics with different damage styles and targeting logic",
        "fall.f3": "Implemented UI systems plus health, economy, and tower management mechanics",
        "fall.f4": "Built a grab & throw system for picking up designated objects and throwing them",
        "fall.f5": "Enhanced grab & throw by restoring the enemy’s last movement path after being thrown",
        "fall.f6": "Created power-ups that modify player stats",
        "fall.f7": "Implemented a stamina system with dynamic regeneration and action costs",

        "welcome.desc": "A game featuring environmental interaction, screen control systems, and gameplay focused on eliminating a virus...",
        "welcome.role1": "Unity (C#) programmer responsible for implementing gameplay mechanics and supporting the prototyping process.",
        "welcome.s1": "Developed and iterated gameplay features",
        "welcome.s2": "Worked with events and ScriptableObjects for modular logic and data management",
        "welcome.s3": "Created and modified shaders in HLSL",
        "welcome.s4": "Wrote modular and scalable C# code",
        "welcome.s5": "Collaborated in a team using Plastic SCM",
        "welcome.link": "\"Welcome User\" website",

        "mech.f1": "Built a health, mana, and stamina system with stat upgrades and consumables that restore resources",
        "mech.f2": "Created a stat system (HP, CRIT, Movement Speed, Attack Power, Max Stamina, Max Mana) connected to a leveling mechanic",
        "mech.f3": "Designed a skill system inspired by how abilities work in League of Legends",
        "mech.f4": "Created a boss AI with multiple attack sets that reacts dynamically to the player’s actions",
        "mech.f5": "Built a shrine that grants random timed buffs when activated, inspired by Path of Exile",
        "mech.f6": "Implemented a dodge roll and attacks with dynamic weapon switching",
        "mech.f7": "Created a modular quest system enabling easy quest design and rapid addition of new tasks",
        "mech.f8": "Built UI screens for live player stats, leveling, skills, and quests"
    }
};

function applyLanguage(lang) {
    const dict = i18n[lang] || i18n.pl;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const val = dict[key];
        if (typeof val === "string") el.textContent = val;
    });

    const toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = lang === "pl" ? "EN" : "PL";

    localStorage.setItem("site_lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("site_lang");
    const initial = saved === "en" ? "en" : "pl";
    applyLanguage(initial);

    const toggle = document.getElementById("lang-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const next = document.documentElement.lang === "pl" ? "en" : "pl";
        applyLanguage(next);
    });
});


