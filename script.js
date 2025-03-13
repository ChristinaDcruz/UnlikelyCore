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

// --- Product Modal Functionality - UPDATED BUTTON FUNCTIONALITY ---
const productCards = document.querySelectorAll('.product-card');
const productModal = document.getElementById('productModal');
const modalContent = productModal.querySelector('.modal-content');
const closeButton = productModal.querySelector('.close-button');
const modalImageCarousel = productModal.querySelector('.modal-image-container .image-carousel');
const modalProductName = productModal.querySelector('.modal-product-info h3.product-name');
const modalProductDescription = productModal.querySelector('.modal-product-info p.product-description');
const modalProductPrice = productModal.querySelector('.modal-product-info .product-price');
const modalAddToCartButton = productModal.querySelector('.modal-buttons .add-to-cart');
const modalWishlistButton = productModal.querySelector('.modal-buttons .add-to-wishlist');
const modalPrevButton = productModal.querySelector('.modal-image-container .carousel-btn.prev');
const modalNextButton = productModal.querySelector('.modal-image-container .carousel-btn.next');

let currentModalProduct = null; // Track current product in modal
let modalImageIndex = 0; // Track current image in modal carousel

productCards.forEach(card => {
    const viewProductButton = card.querySelector('.product-info .view-product-btn');
    if (viewProductButton) {
        viewProductButton.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            currentModalProduct = productId; // Set current product

            // Populate modal with product details (replace with actual data fetching if needed)
            const productName = card.querySelector('h3').textContent;
            const productDescription = card.querySelector('.product-description')?.textContent || "Description to be added."; // Fallback description
            const productPrice = card.querySelector('.product-price').textContent;
            const imageCarouselHTML = card.querySelector('.image-carousel').innerHTML; // Get carousel images

            modalImageCarousel.innerHTML = imageCarouselHTML;
            modalProductName.textContent = productName;
            modalProductDescription.textContent = productDescription;
            modalProductPrice.textContent = productPrice;
            modalAddToCartButton.dataset.productId = productId; // Set product ID for modal add to cart button
            modalWishlistButton.dataset.productId = productId; // Set product ID for modal wishlist button

            // Set first image active in modal carousel
            const modalImages = productModal.querySelectorAll('.product-image');
            if (modalImages.length > 0) {
                modalImages.forEach(img => img.classList.remove('active')); // Ensure no active class
                modalImages[0].classList.add('active'); // Activate first image
                modalImageIndex = 0; // Reset image index
            }

            productModal.classList.add('show'); // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    }
});

// Carousel navigation for modal
if (modalPrevButton && modalNextButton) {
    modalPrevButton.addEventListener('click', () => navigateModalCarousel(-1));
    modalNextButton.addEventListener('click', () => navigateModalCarousel(1));
}


function navigateModalCarousel(direction) {
    const modalImages = productModal.querySelectorAll('.modal-image-container .product-image');
    if (modalImages.length <= 1) return; // No navigation needed for single image

    modalImages.forEach(img => img.classList.remove('active')); // Deactivate all images
    modalImageIndex = (modalImageIndex + direction + modalImages.length) % modalImages.length; // Update index
    modalImages[modalImageIndex].classList.add('active'); // Activate new image
}


// Close modal functionality
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

window.addEventListener('click', function(event) {
    if (event.target == productModal) {
        closeModal();
    }
});

function closeModal() {
    productModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Enable scrolling again
    currentModalProduct = null; // Reset current product
    modalImageIndex = 0; // Reset modal image index
}

 // Add to Cart button in modal - UPDATED EVENT LISTENER
 if (modalAddToCartButton) {
    modalAddToCartButton.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;
        if (productId) {
            await addToCart(productId); // Call existing addToCart function
            closeModal(); // Close modal after adding to cart (optional)
        }
    });
}

// Wishlist button in modal - UPDATED EVENT LISTENER
if (modalWishlistButton) {
    modalWishlistButton.addEventListener('click', function() {
        const productId = this.dataset.productId;
        const wishlistButtonInCard = document.querySelector(`.product-card[data-product-id="${productId}"] .add-to-wishlist`); // Find corresponding wishlist button in card
        if (wishlistButtonInCard) {
             toggleWishlistItem(wishlistButtonInCard); // Call existing toggleWishlistItem function, passing the button from the card
        }
         closeModal(); // Close modal after adding to wishlist (optional)
    });
}

// --- Auth Page Specific JavaScript (auth.html) ---
if (document.querySelector('.auth-page')) {
    const authModals = document.querySelectorAll('.auth-modal');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const closeAuthLinks = document.querySelectorAll('.auth-modal .close-auth');

    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.remove('show');
            document.getElementById('signupModal').classList.add('show');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('signupModal').classList.remove('show');
            document.getElementById('loginModal').classList.add('show');
        });
    }

    closeAuthLinks.forEach(closeLink => {
        closeLink.forEach(closeLink => { // Corrected iteration
            closeLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
                authModals.forEach(modal => modal.classList.remove('show'));
            });
        });
    });

    // --- Login Form Submission ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            // Basic client-side validation
            if (!email) {
                isValid = false;
                displayError('loginEmail', 'Email is required');
            } else {
                clearError('loginEmail');
            }
            if (!password) {
                isValid = false;
                displayError('loginPassword', 'Password is required');
            } else {
                clearError('loginPassword');
            }

            if (isValid) {
                alert('Login Successful!\n(Functionality to be implemented)'); // Placeholder for actual login
            }
        });
    }

    // --- Signup Form Submission ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;

            // Client-side validation for signup
            if (!name) {
                isValid = false;
                displayError('signupName', 'Full Name is required');
            } else {
                clearError('signupName');
            }
            if (!email) {
                isValid = false;
                displayError('signupEmail', 'Email is required');
            } else if (!isValidEmail(email)) {
                isValid = false;
                displayError('signupEmail', 'Invalid email format');
            }
            else {
                clearError('signupEmail');
            }
            if (!password) {
                isValid = false;
                displayError('signupPassword', 'Password is required');
            } else if (password.length < 6) {
                isValid = false;
                displayError('signupPassword', 'Password must be at least 6 characters long');
            }
             else {
                clearError('signupPassword');
            }
            if (password !== confirmPassword) {
                isValid = false;
                displayError('confirmPassword', 'Passwords do not match');
            } else {
                clearError('confirmPassword');
            }

            if (isValid) {
                alert('Sign Up Successful!\n(Functionality to be implemented)'); // Placeholder for actual signup
            }
        });
    }

    function displayError(fieldId, message) {
        let errorSpan = document.getElementById(fieldId + 'Error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.id = fieldId + 'Error';
            document.getElementById(fieldId).parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    function clearError(fieldId) {
        const errorSpan = document.getElementById(fieldId + 'Error');
        if (errorSpan) {
            errorSpan.textContent = ''; // Clear error message
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;
        if (productId) {
            await addToCart(productId);
        }
    });
});

const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
        toggleWishlistItem(this);
    });
});

// --- Wishlist and Cart Functions with localStorage (UPDATED) ---
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

updateWishlistCount();
updateCartCount();

function toggleWishlistItem(button) {
    button.classList.toggle('active');
    const productCard = button.closest('.product-card');
    if (!productCard) return;

    const productId = productCard.dataset.productId;
    const productName = productCard.querySelector('h3').textContent;
    const productImage = productCard.querySelector('.product-image.active').src; // Get active image

    const wishlistItem = {
        id: productId,
        name: productName,
        image: productImage,
        // You can add other details like price if needed
    };

    if (button.classList.contains('active')) {
        // Add to wishlist
        wishlist.push(wishlistItem);
        alert(`"${productName}" added to wishlist!`); // User feedback
    } else {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.id !== productId);
        alert(`"${productName}" removed from wishlist!`); // User feedback
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage
    updateWishlistCount(); // Update wishlist count in header
}

async function addToCart(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
     if (!productCard) {
        console.error("Product card not found for ID:", productId);
        return;
    }

    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image.active').src; // Get active image

    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1, // Initial quantity
    };

    cart.push(cartItem); // Add item to cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count in header
    alert(`"${productName}" added to cart!`); // User feedback
}

function updateWishlistCount() {
    const wishlistCountSpan = document.querySelector('.wishlist-count');
    if (wishlistCountSpan) {
        wishlistCountSpan.textContent = wishlist.length.toString();
    }
}

function updateCartCount() {
    const cartCountSpan = document.querySelector('.cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = cart.length.toString();
    }
}


  // --- Render Cart Page Content (NEW FUNCTION) ---
  function renderCartPage() {
    console.log("renderCartPage() function called"); // Debug log
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    let cartTotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Looks like you haven't added anything to your cart yet.</p>
            </div>`;
        cartTotalElement.textContent = '₹0';
    } else {
        cartItemsContainer.innerHTML = ''; // Clear existing content
        cart.forEach(item => {
            console.log("Processing cart item:", item); // Debug log - VERY IMPORTANT
            console.log("Item image URL:", item.image); // Debug log - Check image URL
            console.log("Item name:", item.name); // Debug log - Check item name
            console.log("Item price:", item.price); // Debug log - Check item price
            cartTotal += parseInt(item.price.replace('₹', '')) * item.quantity; // Sum up total
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-quantity">
                        <label>Quantity:</label>
                        <input type="number" value="${item.quantity}" min="1" data-product-id="${item.id}" class="quantity-input">
                    </div>
                </div>
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>`; // HTML generation - NO CHANGE HERE
            cartItemsContainer.appendChild(cartItemElement);
        });
        cartTotalElement.textContent = `₹${cartTotal}`;
    }
}

// --- Render Wishlist Page Content (NEW FUNCTION) ---
function renderWishlistPage() {
    console.log("renderWishlistPage() function called"); // Debug log
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
                <p class="empty-wishlist-subtitle">Looks like you haven't added anything to your wishlist yet.</p>
            </div>`;
    } else {
        wishlistItemsContainer.innerHTML = ''; // Clear existing content
        wishlist.forEach(item => {
            console.log("Processing wishlist item:", item); // Debug Log - VERY IMPORTANT
            console.log("Item image URL:", item.image); // Debug log - Check image URL
            console.log("Item name:", item.name); // Debug log - Check item name
            console.log("Item price:", item.price); // Debug log - Check item price
            const wishlistItemElement = document.createElement('div');
            wishlistItemElement.className = 'wishlist-item';
            wishlistItemElement.innerHTML = `
                <div class="wishlist-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="wishlist-item-details">
                    <h3>${item.name}</h3>
                    <p class="wishlist-item-name">${item.name}</p>
                    <p class="wishlist-item-price">${item.price}</p> <!-- Assuming price is also stored in wishlist -->
                </div>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart small-cart-btn" data-product-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="remove-item small-remove-btn" data-product-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`; // HTML generation - NO CHANGE HERE
            wishlistItemsContainer.appendChild(wishlistItemElement);
        });
    }
}

// --- Page Load Render Calls (NEW) ---
if (document.querySelector('.cart-page')) {
    renderCartPage(); // Call renderCartPage on cart.html
}

if (document.querySelector('.wishlist-page')) {
    renderWishlistPage(); // Call renderWishlistPage on wishlist.html
}
