document.addEventListener('DOMContentLoaded', function() {
    // --- Rewritten Header Icon Toggle JavaScript (Ensuring Correct Functionality) ---

    // MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuToggle) { // ADDED check for menuToggle element existence
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            searchBar && searchBar.classList.remove('show');
            cartDropdown && cartDropdown.classList.remove('show');
            wishlistDropdown && wishlistDropdown.classList.remove('show');
        });
    }


    // SEARCH TOGGLE
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-bar input');

    if (searchToggle && searchBar && searchClose && searchInput) { // ADDED checks for all search elements
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBar.classList.toggle('show');
            if (searchBar.classList.contains('show')) {
                searchInput.focus();
                dropdownMenu && dropdownMenu.classList.remove('show');
                cartDropdown && cartDropdown.classList.remove('show');
                wishlistDropdown && wishlistDropdown.classList.remove('show');
            }
        });

        searchClose.addEventListener('click', function() {
            searchBar.classList.remove('show');
        });

        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Add your search functionality here
                console.log('Searching for:', this.value);
                // You can implement the actual search logic here
            }
        });
    }


    // CART TOGGLE
    const cartToggle = document.querySelector('.cart-toggle');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCountSpan = document.querySelector('.cart-count');
    const cartProductList = document.querySelector('.cart-dropdown .dropdown-product-list');
    const cartEmptyMessage = document.querySelector('.cart-dropdown .empty-message');


    // WISHLIST TOGGLE
    const wishlistToggle = document.querySelector('.wishlist-toggle');
    const wishlistDropdown = document.querySelector('.wishlist-dropdown');
    const wishlistCountSpan = document.querySelector('.wishlist-count');
    const wishlistProductList = document.querySelector('.wishlist-dropdown .dropdown-product-list');
    const wishlistEmptyMessage = document.querySelector('.wishlist-dropdown .empty-message');


    // HERO SLIDER (Auto-Slide Implementation - No Dots)
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index < 0) {
            slideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            slideIndex = 0;
        }
        slider.style.transform = `translateX(-${slideIndex * 100}vw)`;
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
    }

    // Start auto-slide when page loads
    startAutoSlide();
    showSlide(slideIndex); // Show initial slide


    // --- About Us "Read More" Functionality - REWRITTEN ---
    const readMoreButton = document.querySelector('.read-more-button');
    const shortText = document.querySelector('.short-text');
    const fullText = document.querySelector('.full-text');
    const aboutImageContainer = document.querySelector('.about-image-container'); // Select image container

    if (readMoreButton) {
        readMoreButton.addEventListener('click', function() {
            fullText.classList.toggle('hidden'); // Toggle hidden class on full text container
            aboutImageContainer.classList.toggle('hidden'); // Toggle hidden class on image container

            if (fullText.classList.contains('hidden')) {
                readMoreButton.textContent = 'Read More';
                shortText.classList.remove('hidden'); // Show short text when collapsed
            } else {
                readMoreButton.textContent = 'Read Less';
                shortText.classList.add('hidden'); // Hide short text when expanded
            }
        });
    }


   // --- Product Data (Keep your productData object - no changes needed here) ---
    const productData = { // (Keep your productData object - no changes needed here)
        '1': {
            name: 'Pink Sparkler',
            description: 'Capture the essence of romance with these delicate blush pink and crystal drop earrings.',
            price: '₹250',
            images: ['images/product1a.jpg', 'images/product1b.jpg', 'images/product1c.jpg']
        },
        '2': {
            name: 'Apple of My Eye',
            description: 'Express your love with these captivating earrings. The vibrant red spheres symbolize passion and romance.',
            price: '₹250',
            images: ['images/product2a.jpg', 'images/product2b.jpg', 'images/product2c.jpg']
        },
        '3': {
            name: 'Coastal Crush',
            description: 'Unfold your inner oddities with these ruby red beads, full of life and energy.',
            price: '₹250',
            images: ['images/product3a.jpg', 'images/product3b.jpg', 'images/product3c.jpg']
        },
        '4': {
            name: 'Comet Cluster',
            description: 'Faceted peachy clear crystal beads, stacked for a delicate, light-reflecting sparkle.',
            price: '₹250',
            images: ['images/product4a.jpg', 'images/product4b.jpg', 'images/product4c.jpg']
        },
        '5': {
            name: 'Solar Sonata',
            description: 'Golden-yellow crystal beads, arranged in a cascading design for a radiant sparkle.',
            price: '₹250',
            images: ['images/product5a.jpg', 'images/product5b.jpg', 'images/product5c.jpg']
        },
        '6': {
            name: 'Lunar Lust',
            description: 'These earrings feature a bold contrast of glossy black square beads and smooth white spheres.',
            price: '₹250',
            images: ['images/product6a.jpg', 'images/product6b.jpg', 'images/product6c.jpg']
        },
        '7': {
            name: 'Glacial Gust',
            description: 'Teal & icy blue bead earrings featuring a mix of smooth spheres, textured glass.',
            price: '₹250',
            images: ['images/product7a.jpg', 'images/product7b.jpg', 'images/product7c.jpg']
        },
        '8': {
            name: 'Earthy Echo',
            description: 'Polished carnelian spheres, rich and warm, stacked into earthy elegance.',
            price: '₹250',
            images: ['images/product8a.jpg', 'images/product8b.jpg', 'images/product8c.jpg']
        },
        '9': {
            name: 'Heavenly Harm',
            description: 'Chunky denim-blue beads get a playful twist with sweet little sky-blue toppers.',
            price: '₹250',
            images: ['images/product9a.jpg', 'images/product9b.jpg', 'images/product9c.jpg']
        }
    };

    // --- Product Grid Wishlist and Cart Functionality - Updated to display product names, images & prices, and Remove ---
    const productCards = document.querySelectorAll('.product-card');

    function updateWishlistCount() {
        let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        wishlistCountSpan.textContent = wishlistItems.length;

        wishlistProductList.innerHTML = '';
        if (wishlistItems.length === 0) {
            wishlistEmptyMessage.style.display = 'block';
        } else {
            wishlistEmptyMessage.style.display = 'none';
            wishlistItems.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('dropdown-product-item');
                li.dataset.productId = item.id;

                li.innerHTML = `
                    <div class="dropdown-item-image">
                        <img src="${item.images[0]}" alt="${item.name}" class="dropdown-list-image">
                    </div>
                    <div class="dropdown-item-details">
                        <span class="dropdown-item-name">${item.name}</span>
                    </div>
                    <button class="remove-item-btn wishlist-remove-btn" data-product-id="${item.id}"><i class="fas fa-times"></i></button>
                `;
                wishlistProductList.appendChild(li);
            });
        }
    }

    function updateCartCount() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartCountSpan.textContent = cartItems.length;

        cartProductList.innerHTML = '';
        if (cartItems.length === 0) {
            cartEmptyMessage.style.display = 'block';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('dropdown-product-item');
                li.dataset.productId = item.id;
                li.innerHTML = `
                    <div class="dropdown-item-image">
                        <img src="${item.images[0]}" alt="${item.name}" class="dropdown-list-image">
                    </div>
                    <div class="dropdown-item-details">
                        <span class="dropdown-item-name">${item.name}</span>
                        <span class="dropdown-item-price">${item.price}</span>
                    </div>
                    <button class="remove-item-btn" data-product-id="${item.id}"><i class="fas fa-times"></i></button>
                `;
                cartProductList.appendChild(li);
            });
        }
    }


    productCards.forEach(card => {
        const productId = card.dataset.productId;
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const wishlistButton = card.querySelector('.wishlist-btn');
        const addToCartButton = card.querySelector('.add-to-cart-btn');

        wishlistButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            alert(`"${productName}" added to Wishlist! (Simulated)`);

            let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            wishlistItems.push({ id: productId, name: productName, images: productData[productId].images, price: productPrice });
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

            updateWishlistCount();
        });

        addToCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            alert(`"${productName}" added to Cart! (Simulated)`);

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({ id: productId, name: productName, images: productData[productId].images, price: productPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
        });
    });

    // --- Event Listeners for Remove from Wishlist/Cart ---

    // Event listener for "Remove from Wishlist" buttons (delegated)
    wishlistDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-remove-btn') || e.target.closest('.wishlist-remove-btn')) {
            const removeButton = e.target.closest('.wishlist-remove-btn');
            const productIdToRemove = removeButton.dataset.productId;

            let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            wishlistItems = wishlistItems.filter(item => item.id !== productIdToRemove);
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
            updateWishlistCount();
        }
    });

    // Event listener for "Remove from Cart" buttons (delegated)
    cartDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item-btn') && !e.target.classList.contains('wishlist-remove-btn') || e.target.closest('.remove-item-btn:not(.wishlist-remove-btn)')) {
             const removeButton = e.target.closest('.remove-item-btn:not(.wishlist-remove-btn)');
            const productIdToRemove = removeButton.dataset.productId;

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.id !== productIdToRemove);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
        }
    });


    // Initial count updates on page load
    updateWishlistCount();
    updateCartCount();


    // MENU TOGGLE
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            searchBar && searchBar.classList.remove('show');
            cartDropdown && cartDropdown.classList.remove('show');
            wishlistDropdown && wishlistDropdown.classList.remove('show');
        });
    }

    // SEARCH TOGGLE
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBar.classList.toggle('show');
            if (searchBar.classList.contains('show')) {
                searchInput && searchInput.focus();
                dropdownMenu && dropdownMenu.classList.remove('show');
                cartDropdown && cartDropdown.classList.remove('show');
                wishlistDropdown && wishlistDropdown.classList.remove('show');
            }
        });
    }

    // Close search bar
    if (searchClose && searchBar) {
        searchClose.addEventListener('click', function() {
            searchBar.classList.remove('show');
        });
    }

    // CART TOGGLE
    if (cartToggle && cartDropdown) {
        cartToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            cartDropdown.classList.toggle('show');
            wishlistDropdown && wishlistDropdown.classList.remove('show');
            dropdownMenu && dropdownMenu.classList.remove('show');
            searchBar && searchBar.classList.remove('show');
        });
    }

    // WISHLIST TOGGLE
    if (wishlistToggle && wishlistDropdown) {
        wishlistToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            wishlistDropdown.classList.toggle('show');
            cartDropdown && cartDropdown.classList.remove('show');
            dropdownMenu && dropdownMenu.classList.remove('show');
            searchBar && searchBar.classList.remove('show');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownMenu && searchBar && cartDropdown && wishlistDropdown &&
            !e.target.closest('.menu-container') && !e.target.closest('.search-container') &&
            !e.target.closest('.cart-container') && !e.target.closest('.wishlist-container')) {
            dropdownMenu.classList.remove('show');
            searchBar.classList.remove('show');
            cartDropdown.classList.remove('show');
            wishlistDropdown.classList.remove('show');
        }
    });

    // Handle search input Enter key
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Add your search functionality here
                console.log('Searching for:', this.value);
                // You can implement the actual search logic here
            }
        });
    }
});

 // --- Contact Us Section - CTA Button Functionality ---

 const contactCtas = document.querySelectorAll('.contact-cta');

    contactCtas.forEach(cta => {
        const contactButton = cta.querySelector('.contact-button');
        const contactImageContainer = cta.querySelector('.contact-image-container');

        contactButton.addEventListener('click', function() {
            contactImageContainer.classList.toggle('show'); // Toggle 'show' class on clicked image

            // --- Accordion Behavior - Collapse Other Images ---
            contactCtas.forEach(otherCta => {
                if (otherCta !== cta) { // If it's not the currently clicked CTA
                    const otherImageContainer = otherCta.querySelector('.contact-image-container');
                    otherImageContainer.classList.remove('show'); // Remove 'show' class to collapse other images
                }
            });
        });
    });

    // --- FAQ Section - Accordion Functionality (No changes needed - keep as is) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
            this.classList.toggle('active');

            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('show');
                }
            });
        });
    });
