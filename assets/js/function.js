//nav funkció

document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.querySelector('.navigation');
    const navList = document.querySelector('.nav-list');
    const navToggle = document.getElementById('nav-toggle');
  
    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 0) {
          navigation.style.position = 'fixed';
        } else {
          navigation.style.position = 'static';
        }
      }
      
  
    // Initial call to handle scroll to set initial styles
    handleScroll();
  
    // Add scroll event listener to window
    window.addEventListener('scroll', handleScroll);
  
    // Other navigation menu functionality
    // If a link has a dropdown, add sub menu toggle
    document.querySelectorAll('nav ul li a:not(:only-child)').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var dropdown = this.nextElementSibling;
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          // Close one dropdown when selecting another
          document.querySelectorAll('.nav-dropdown').forEach(function(item) {
            if (item !== dropdown) {
              item.style.display = 'none';
            }
          });
          e.stopPropagation();
        }
      });
    });
  
    // Clicking away from dropdown will remove the dropdown class
    document.addEventListener('click', function() {
      document.querySelectorAll('.nav-dropdown').forEach(function(item) {
        item.style.display = 'none';
      });
    });
  
    // Toggle open and close nav styles on click
    document.getElementById('nav-toggle').addEventListener('click', function() {
      var navUl = document.querySelector('nav ul');
      navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
    });
  
    // Hamburger to X toggle
    document.getElementById('nav-toggle').addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  



//carousel funkciók

const carouselWrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentSlide = 0;
const slideWidth = slides[0].clientWidth;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Adjust the threshold as needed

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    currentSlide = slideIndex;
    carouselWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateCounter(); // Update carousel counter dots
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
    touchStartX = 0;
    touchEndX = 0;
}

carouselWrapper.addEventListener('touchstart', handleTouchStart);
carouselWrapper.addEventListener('touchmove', handleTouchMove);
carouselWrapper.addEventListener('touchend', handleTouchEnd);

// Function to update counter dots
function updateCounter() {
    const counterContainer = document.querySelector('.carousel-counter');
    counterContainer.innerHTML = ''; // Clear previous dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === currentSlide) {
            dot.classList.add('active');
        }
        counterContainer.appendChild(dot);
    }
}

// Initial update of carousel counter dots
updateCounter();


const intervalId = setInterval(nextSlide, 5000);





//Pillár funkció

const pillarcontainer = document.getElementById('pillar-container');

function generateRandomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPillar(height) {
    const pillar = document.createElement('div');
    pillar.classList.add('pillar');
    pillar.style.height = `${height}px`;
    pillar.innerText = height; // Show height inside the pillar
    pillarcontainer.appendChild(pillar);

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