//nav funkció

document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.querySelector('.navigation');
    const navList = document.querySelector('.nav-list');
    const navToggle = document.getElementById('nav-toggle');
    let isNavigationFixed = false; // Flag to track whether navigation is fixed

    // Function to handle scroll event
    function handleScroll() {
        if (window.scrollY > 0) {
            navigation.style.position = 'fixed';
            isNavigationFixed = true;
        } else {
            navigation.style.position = 'static';
            isNavigationFixed = false;
        }
    }

    // Initial call to handle scroll to set initial styles
    handleScroll();

    // Add scroll event listener to window
    window.addEventListener('scroll', handleScroll);

    // Function to handle navigation link clicks
    function handleNavLinkClick(event) {
        const targetId = this.getAttribute('href').substring(1); // Get target ID from href
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetRect = targetElement.getBoundingClientRect(); // Get target element's position relative to viewport
            let offset = targetRect.top + window.pageYOffset - navigation.clientHeight; // Calculate offset relative to document
            if (!isNavigationFixed) {
                offset -= navigation.clientHeight; // Adjust offset if navigation is static
            }
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    }

    // Add click event listener to navigation links
    document.querySelectorAll('nav ul li a').forEach(function (link) {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Other navigation menu functionality
    // If a link has a dropdown, add sub menu toggle
    document.querySelectorAll('nav ul li a:not(:only-child)').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                // Close one dropdown when selecting another
                document.querySelectorAll('.nav-dropdown').forEach(function (item) {
                    if (item !== dropdown) {
                        item.style.display = 'none';
                    }
                });
                e.stopPropagation();
            }
        });
    });

    // Clicking away from dropdown will remove the dropdown class
    document.addEventListener('click', function () {
        document.querySelectorAll('.nav-dropdown').forEach(function (item) {
            item.style.display = 'none';
        });
    });

    // Toggle open and close nav styles on click
    document.getElementById('nav-toggle').addEventListener('click', function () {
        var navUl = document.querySelector('nav ul');
        navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
    });

    // Hamburger to X toggle
    document.getElementById('nav-toggle').addEventListener('click', function () {
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
let intervalId;

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    currentSlide = slideIndex;
    carouselWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateCounter(); // Update carousel counter dots
    resetInterval(); // Reset interval on slide change
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
        dot.dataset.index = i; // Set custom data attribute to store index
        if (i === currentSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
        });
        counterContainer.appendChild(dot);
    }
}

// Initial update of carousel counter dots
updateCounter();

// Function to reset interval
function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 3000);
}

// Set interval for automatic sliding
intervalId = setInterval(nextSlide, 3000);


// Rendezés funkció

let initialNumbers = [];

// Function to generate random numbers for bars
function generateRandomNumbers(numBars, minHeight, maxHeight) {
    let numbers = [];
    for (let i = 0; i < numBars; i++) {
        numbers.push(Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight);
    }
    return numbers;
}

// Function to display bars
function displayBars(arr) {
    const barsContainer = document.getElementById("bars-container");
    barsContainer.innerHTML = "";
    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 5 + "px";
        bar.innerHTML = '<h3>' + value + '</h3>';
        barsContainer.appendChild(bar);
    });
}

// Insertion Sort Algorithm
async function insertionSort(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            await sleep(150); // Delay for visualization
            displayBars([...arr]); // Pass a copy of the array
        }
        arr[j + 1] = key;
    }
    document.getElementById("sort-button").innerText = "Újra";
    document.getElementById("sort-button").disabled = false;
}

// Helper function for delaying
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to start sorting
function startSorting() {
    const sortButton = document.getElementById("sort-button");
    if (sortButton.innerText === "Animáció indítása") {
        sortButton.innerText = "Rendezés...";
        sortButton.disabled = true;

        // Use the initial numbers for sorting
        insertionSort([...initialNumbers]); // Pass a copy of the array
    } else {
        // Restart button functionality
        sortButton.innerText = "Rendezés...";
        sortButton.disabled = true;
        displayBars([...initialNumbers]); // Pass a copy of the array
        insertionSort([...initialNumbers]); // Pass a copy of the array
    }
}

// Initialize bars
const numBars = 10; // Change this value for more or less bars
const minHeight = 10; // Minimum height of bars
const maxHeight = 50; // Change this value to adjust maximum height of bars
initialNumbers = generateRandomNumbers(numBars, minHeight, maxHeight);
displayBars(initialNumbers);