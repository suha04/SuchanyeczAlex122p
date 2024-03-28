//Carousel funkció

const carouselWrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentSlide = 0;
const slideWidth = slides[0].clientWidth;
let intervalId;

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    currentSlide = slideIndex;
    carouselWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
    clearInterval(intervalId);
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
    startInterval();
}

function prevSlide() {
    clearInterval(intervalId);
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
    startInterval();
}

 function startInterval() {
     intervalId = setInterval(nextSlide, 5000);
}

startInterval(); // Start interval initially

// Swipe support for touch devices
let touchstartX = 0;
let touchendX = 0;

carouselWrapper.addEventListener('touchstart', function (event) {
    clearInterval(intervalId); // Clear interval on touchstart
    touchstartX = event.changedTouches[0].screenX;
}, false);

carouselWrapper.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
    startInterval(); // Start interval again after touchend
}, false);

function handleGesture() {
    if (touchendX < touchstartX) {
        nextSlide();
    }
    if (touchendX > touchstartX) {
        prevSlide();
    }
}


//Pillár funkció

const container = document.getElementById('pillar-container');

function generateRandomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPillar(height) {
    const pillar = document.createElement('div');
    pillar.classList.add('pillar');
    pillar.style.height = `${height}px`;
    pillar.innerText = height; // Show height inside the pillar
    container.appendChild(pillar);

}


// Generate and append pillars with random heights
for (let i = 0; i < 5; i++) { // Generating 5 pillars
    const randomHeight = generateRandomHeight(150, 300);
    createPillar(randomHeight);
}

setTimeout(() => {
    const pillars = document.querySelectorAll('.pillar');
    const heights = Array.from(pillars).map(pillar => parseInt(pillar.style.height));
    const sortedHeights = heights.slice().sort((a, b) => a - b);

    // Sort and update pillar heights
    pillars.forEach((pillar, index) => {
        pillar.style.height = `${sortedHeights[index]}px`;
        pillar.innerText = sortedHeights[index]; // Update text inside the pillar with sorted height
    });
}, 500); // Delay for 2 seconds before sorting animation