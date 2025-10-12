document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.querySelector('.nav-links').classList.remove('nav-active');
                document.querySelector('.hamburger').classList.remove('toggle');
            }
        });
    });
    
    // 3. Fade-in Animation on Scroll
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(el => observer.observe(el));

    // 4. Exclusive Offers Countdown Timer
    const countdown = () => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 10);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            if (distance < 0) {
                clearInterval(interval);
                document.getElementById('countdown').innerHTML = "<div style='font-size: 1.5rem; font-weight: 500;'>OFFER EXPIRED</div>";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }, 1000);
    };
    countdown();

    // 5. Seamless Carousel Function
    const initializeCarousel = (wrapperSelector, trackSelector, prevBtnSelector, nextBtnSelector, intervalTime = 4000) => {
        const carouselWrapper = document.querySelector(wrapperSelector);
        const track = document.querySelector(trackSelector);
        if (!carouselWrapper || !track) return; 
        
        let slides = Array.from(track.children);
        const nextButton = document.querySelector(nextBtnSelector);
        const prevButton = document.querySelector(prevBtnSelector);
        if (slides.length === 0) return;

        // Clone first and last slides for the infinite effect
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20 is the gap
        let currentIndex = 1; // Start at the first real slide
        let autoSlideInterval;

        // Initial position without transition
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        const moveToSlide = (index) => {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${slideWidth * index}px)`;
        };

        const slideNext = () => {
            currentIndex++;
            moveToSlide(currentIndex);

            if (currentIndex >= slides.length - 1) { // If on the last clone
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 1;
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                }, 500); // Must match CSS transition duration
            }
        };
        
        const slidePrev = () => {
            currentIndex--;
            moveToSlide(currentIndex);

            if (currentIndex <= 0) { // If on the first clone
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = slides.length - 2;
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                }, 500);
            }
        };
        
        nextButton.addEventListener('click', slideNext);
        prevButton.addEventListener('click', slidePrev);

        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(slideNext, intervalTime);
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        startAutoSlide();
        carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    };

    // Initialize only the "Best Selling" carousel
    initializeCarousel('.carousel-wrapper', '.carousel-track', '.prev-btn', '.next-btn', 3000);

    // 6. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('toggle');
        navMenu.classList.toggle('nav-active');
    });
});
