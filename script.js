document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar on Scroll (Tidak Berubah)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }

    // 2. Smooth Scrolling (Disesuaikan untuk link antar halaman)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Jika link adalah hash link di halaman yang sama (index.html)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Tutup menu mobile jika terbuka
                document.querySelector('.nav-links').classList.remove('nav-active');
                document.querySelector('.hamburger').classList.remove('toggle');
            }
            // Jika link ke halaman lain (misal: index.html#category dari product.html),
            // biarkan browser menanganinya secara normal.
        });
    });
    
    // 3. Fade-in Animation on Scroll (Tidak Berubah)
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

    // 4. Exclusive Offers Countdown Timer (Diberi Pengecekan)
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdown = () => {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 10);
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = endDate - now;
                if (distance < 0) {
                    clearInterval(interval);
                    countdownElement.innerHTML = "<div style='font-size: 1.5rem; font-weight: 500;'>OFFER EXPIRED</div>";
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
    }

    // 5. Seamless Carousel Function (Diberi Pengecekan)
    const initializeCarousel = (wrapperSelector, trackSelector, prevBtnSelector, nextBtnSelector, intervalTime = 4000) => {
        const carouselWrapper = document.querySelector(wrapperSelector);
        const track = document.querySelector(trackSelector);
        if (!carouselWrapper || !track) return; // Hanya berjalan jika carousel ada di halaman
        
        let slides = Array.from(track.children);
        const nextButton = document.querySelector(nextBtnSelector);
        const prevButton = document.querySelector(prevBtnSelector);
        if (slides.length === 0) return;

        // Kloning
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);
        slides = Array.from(track.children);
        
        const slideWidth = slides[0].getBoundingClientRect().width + 20; 
        let currentIndex = 1; 
        let autoSlideInterval;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        const moveToSlide = (index) => {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${slideWidth * index}px)`;
        };
        const slideNext = () => {
            currentIndex++;
            moveToSlide(currentIndex);
            if (currentIndex >= slides.length - 1) { 
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 1;
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                }, 500); 
            }
        };
        const slidePrev = () => {
            currentIndex--;
            moveToSlide(currentIndex);
            if (currentIndex <= 0) { 
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
        const stopAutoSlide = () => clearInterval(autoSlideInterval);
        
        startAutoSlide();
        carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    };

    // Inisialisasi carousel (hanya berjalan di index.html)
    initializeCarousel('.carousel-wrapper', '.carousel-track', '.prev-btn', '.next-btn', 3000);

    // 6. Hamburger Menu Toggle (Tidak Berubah)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('toggle');
            navMenu.classList.toggle('nav-active');
        });
    }

    // =========================================================
    // ======== 7. BARU: Logika untuk Halaman Produk ========
    // =========================================================
    // Cek apakah kita berada di halaman produk
    if (document.getElementById('product-details')) {
        
        // Fungsi untuk mengisi halaman dengan data produk
        const loadProductDetails = () => {
            // 1. Baca ID produk dari URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');

            // 2. Ambil data produk dari 'database' (allProducts dari products.js)
            const product = allProducts[productId];

            // 3. Jika produk ditemukan, isi halaman
            if (product) {
                document.getElementById('product-image').src = product.imageUrl;
                document.getElementById('product-image').alt = product.name;
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-price').textContent = product.price;
                document.getElementById('product-specs').innerHTML = product.specs;
                document.getElementById('product-description').textContent = product.description;
                document.title = `${product.name} - Fashion Store`; // Update judul tab browser
            } else {
                // Jika ID tidak ditemukan, tampilkan pesan error
                document.getElementById('product-name').textContent = "Produk Tidak Ditemukan";
                document.getElementById('product-description').textContent = "Maaf, produk yang Anda cari tidak ada.";
            }
        };

        // Panggil fungsi untuk memuat data
        loadProductDetails();

        // Logika untuk Opsi Warna
        const colorDots = document.querySelectorAll('.color-options .color-dot');
        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                colorDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        // Logika untuk Opsi Ukuran
        const sizeButtons = document.querySelectorAll('.size-options .size-btn');
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
});
