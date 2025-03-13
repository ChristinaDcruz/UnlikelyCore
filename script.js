document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }

    document.addEventListener('click', function(event) {
        if (dropdownMenu && dropdownMenu.classList.contains('show') && !event.target.closest('.menu-container')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // --- Search Bar Toggle ---
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');

    if (searchToggle && searchBar && searchClose) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchBar.classList.add('show');
        });

        searchClose.addEventListener('click', function(e) {
            searchBar.classList.remove('show');
        });
    }

    // --- Hero Section Slideshow ---
    if (document.querySelector('.hero-section')) {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.querySelector('.slide-nav.prev');
        const nextButton = document.querySelector('.slide-nav.next');
        let slideInterval;

        function showSlide(n) {
            if (!slides.length) return;

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slideIndex = (n + slides.length) % slides.length;

            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active'); // Corrected line: Use index for dots as well
        }


        function nextSlide() {
            showSlide(slideIndex + 1);
        }

        function prevSlide() {
            showSlide(slideIndex - 1);
        }

        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                resetInterval();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
                resetInterval();
            });
        }

        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function(e) {
                    e.preventDefault();
                    showSlide(index);
                    resetInterval();
                });
            });
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startSlideshow();
        }

        startSlideshow();

        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            slideshow.addEventListener('mouseleave', () => {
                startSlideshow();
            });
        }
    }

    // --- About Us Section "Read More" ---
    if (document.getElementById('about-us')) {
        const readMoreBtn = document.getElementById('readMoreBtn');
        const expandedContent = document.getElementById('expandedContent');

        if (readMoreBtn && expandedContent) {
            readMoreBtn.addEventListener('click', function() {
                expandedContent.classList.toggle('show');
                if (expandedContent.classList.contains('show')) {
                    readMoreBtn.textContent = 'Read Less';
                } else {
                    readMoreBtn.textContent = 'Read More';
                }
            });
        }
    }

    // --- FAQ Section Accordion ---
    if (document.getElementById('faq-section')) {
        const faqQuestions = document.querySelectorAll('#faq-section .faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                if (!answer) return;

                answer.classList.toggle('show');
                question.classList.toggle('active');
            });
        });
    }

    // --- Contact Us Section Popups ---
    if (document.getElementById('contact-us')) {
        const chatBtn = document.getElementById('chatBtn');
        const socialPopup = document.getElementById('socialPopup');

        if (chatBtn && socialPopup) {
            const instagramIconChat = socialPopup.querySelector('.social-icon.instagram');
            const facebookIconChat = socialPopup.querySelector('.social-icon.facebook');

            if (instagramIconChat) {
                instagramIconChat.addEventListener('click', function(event) {
                    event.preventDefault();
                    window.open('https://www.instagram.com/unlike_lycore/', '_blank');
                });
            }
            if (facebookIconChat) {
                facebookIconChat.addEventListener('click', function(event) {
                    event.preventDefault();
                    window.open('https://www.facebook.com/unlikelycore', '_blank');
                });
            }
            chatBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                callInfo.classList.remove('show');
                emailPopup.classList.remove('show');
                socialPopup.classList.toggle('show');
            });
        }


        const callBtn = document.getElementById('callBtn');
        const callInfo = document.getElementById('callInfo');
        if (callBtn) {
            callBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                socialPopup.classList.remove('show');
                emailPopup.classList.remove('show');
                callInfo.classList.toggle('show');
            });
        }

        const emailBtn = document.getElementById('emailBtn');
        const emailPopup = document.getElementById('emailPopup');
        if (emailBtn) {
            emailBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                callInfo.classList.remove('show');
                socialPopup.classList.remove('show');
                emailPopup.classList.toggle('show');
            });
        }

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.contact-buttons')) {
                callInfo.classList.remove('show');
                socialPopup.classList.remove('show');
                emailPopup.classList.remove('show');
            }
        });
    }

    // --- Product Image Carousel ---
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const prevBtn = card.querySelector('.carousel-btn.prev');
        const nextBtn = card.querySelector('.carousel-btn.next');
        const images = card.querySelectorAll('.product-image');
        let currentImageIndex = 0;

        if (images.length > 0) {
            images[currentImageIndex].classList.add('active'); // Initially show first image
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                images[currentImageIndex].classList.add('active');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
            });
        }
    });
});
