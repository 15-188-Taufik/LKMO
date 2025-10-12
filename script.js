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

    // 2. Smooth Scrolling for Navigation Links (also closes mobile menu)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu on link click
                document.querySelector('.nav-links').classList.remove('nav-active');
                document.querySelector('.hamburger').classList.remove('toggle');
            }
        });
    });
    
    // 3. Fade-in Animation on Scroll
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => observer.observe(el));

    // 4. Exclusive Offers Countdown Timer
    const countdown = () => {
        const endDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(interval);
                document.getElementById('countdown').innerHTML = "<div>EXPIRED</div>";
            }
        }, 1000);
    };
    countdown();

    // 5. DIUBAH: Carousel Logic with Autoplay and Loop
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20 is the gap

    let currentIndex = 0;
    let autoSlideInterval;

    // Fungsi untuk pindah slide
    const moveToSlide = (index) => {
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
    };

    // Fungsi untuk slide berikutnya dengan loop
    const slideNext = () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0; // Kembali ke awal jika sudah di akhir
        }
        moveToSlide(currentIndex);
    };
    
    // Fungsi untuk slide sebelumnya dengan loop
    const slidePrev = () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1; // Pindah ke akhir jika sudah di awal
        }
        moveToSlide(currentIndex);
    };
    
    // Event listener untuk tombol
    nextButton.addEventListener('click', slideNext);
    prevButton.addEventListener('click', slidePrev);

    // Fungsi untuk memulai auto-slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(slideNext, 3000); // Ganti slide setiap 3 detik
    };
    
    // Fungsi untuk menghentikan auto-slide
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };
    
    // Mulai auto-slide saat halaman dimuat
    startAutoSlide();

    // Hentikan auto-slide saat mouse di atas carousel, dan mulai lagi saat mouse keluar
    carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
    carouselWrapper.addEventListener('mouseleave', startAutoSlide);


    // 6. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('toggle');
        navMenu.classList.toggle('nav-active');
    });
});