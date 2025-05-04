document.addEventListener("DOMContentLoaded", function () {
    const slideTrack = document.querySelector(".slide-track");
    let slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    let currentSlide = 1; // Start at 1 because we add a clone before it
    let autoSlideInterval = null;
    let idleTimeout = null;

    // Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    slideTrack.appendChild(firstClone); // Add clone of first at end
    slideTrack.insertBefore(lastClone, slides[0]); // Add clone of last at start

    slides = document.querySelectorAll(".slide"); // Re-select with clones

    // Set initial position
    function setPosition() {
        const slideWidth = slides[0].offsetWidth;
        slideTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Slide with smooth transition
    function goToSlide(index) {
        const slideWidth = slides[0].offsetWidth;
        slideTrack.style.transition = "transform 0.5s ease-in-out";
        slideTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        currentSlide = index;
    }

    // Instantly jump without animation (for looping effect)
    function jumpToSlide(index) {
        const slideWidth = slides[0].offsetWidth;
        slideTrack.style.transition = "none";
        slideTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        currentSlide = index;
    }

    // Main slide handler
    function changeSlide(direction) {
        goToSlide(currentSlide + direction);
        resetIdleTimer();
    }

    // After transition: check if at fake slide, then jump instantly
    slideTrack.addEventListener("transitionend", () => {
        if (slides[currentSlide].classList.contains("clone")) {
            if (currentSlide === 0) {
                jumpToSlide(totalSlides); // real last
            } else if (currentSlide === slides.length - 1) {
                jumpToSlide(1); // real first
            }
        }
    });

    window.changeSlide = changeSlide;

    function startAutoSlide() {
        if (autoSlideInterval) return;
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function resetIdleTimer() {
        stopAutoSlide();
        if (idleTimeout) clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            startAutoSlide();
        }, 10000); // wait 10s after last interaction
    }

    // Initial setup
    window.addEventListener("resize", setPosition);
    setPosition();
    resetIdleTimer();
});
