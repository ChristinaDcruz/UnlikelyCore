// Cart and Wishlist Storage
let cart = [];
let wishlist = [];

// UTILITY FUNCTIONS 

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation for notification
    setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 10);
}

// Show loading state
function showLoadingState(isLoading) {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        if (isLoading) {
            loadingOverlay.classList.add('show');
        } else {
            loadingOverlay.classList.remove('show');
        }
    }
}

// CART FUNCTIONS

// Add to cart function with e-commerce features
async function addToCart(productId) {
    try {
        showLoadingState(true);
        
        const response = await fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('userId')
            },
            body: JSON.stringify({ productId })
        });

        const data = await response.json();
        
        if (data.success) {
            showNotification('Item added to cart!', 'success');
            await updateCartUI();
        } else {
            throw new Error(data.error || 'Failed to add item');
        }
    } catch (error) {
        console.error('Cart error:', error);
        showNotification(error.message, 'error');
    } finally {
        showLoadingState(false);
    }
}

// Fetch cart data from API
async function fetchCart() {
    try {
        const response = await fetch('http://localhost:5000/api/cart', {
            headers: {
                'X-User-ID': localStorage.getItem('userId')
            }
        });
        const data = await response.json();
        cart = data.cart;
        return cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
}

// Update cart UI
async function updateCartUI() {
    try {
        await renderCartItems();
        updateCartCount();
    } catch (error) {
        console.error('Error updating cart UI:', error);
    }
}

// Update cart count indicator
function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Render cart items in the modal
async function renderCartItems() {
    const cartContent = document.querySelector('.cart-content');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartContent) {
        console.error('Cart content element not found');
        return;
    }
    
    if (!cartTotal) {
        console.error('Cart total element not found');
        return;
    }
    
    console.log('Rendering cart items:', cart);
    
    if (!cart || cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Looks like you haven't added anything to your cart yet.</p>
            </div>
        `;
        cartTotal.textContent = '₹0';
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    
    // Render cart items with enhanced information
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-meta">
                            <span class="cart-item-sku">SKU: ${item.sku || 'N/A'}</span>
                            <span class="cart-item-category">Category: ${item.category || 'Jewelry'}</span>
                        </div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" onclick="updateItemQuantity('${item.id}', -1)">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" onclick="updateItemQuantity('${item.id}', 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="removeCartItem('${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Update total and track view cart event
    cartTotal.textContent = `₹${total}`;
    trackEcommerceEvent('view_cart', {
        currency: 'INR',
        value: total,
        items: cart.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
        }))
    });
}

// Update item quantity in cart
async function updateItemQuantity(itemId, change) {
    try {
        const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'X-User-ID': localStorage.getItem('userId')
            },
            body: JSON.stringify({ quantity: change })
        });
        const data = await response.json();
        if (data.success) {
            await updateCartUI();
            showNotification(`Updated quantity of item ${itemId}`, 'info');
        } else {
            showNotification('Failed to update quantity', 'error');
        }
    } catch (error) {
        console.error('Error updating item quantity:', error);
        showNotification('Error updating item quantity', 'error');
    }
}

// Remove item from cart
async function removeCartItem(itemId) {
    try {
        const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'X-User-ID': localStorage.getItem('userId')
            }
        });
        const data = await response.json();
        if (data.success) {
            await updateCartUI();
            showNotification(`Removed item ${itemId} from cart`, 'info');
        } else {
            showNotification('Failed to remove item', 'error');
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        showNotification('Error removing item from cart', 'error');
    }
}

// Complete checkout process
async function processCheckout() {
    try {
        const response = await fetch('http://localhost:5000/api/checkout', {
            method: 'POST',
            headers: {
                'X-User-ID': localStorage.getItem('userId')
            }
        });
        const data = await response.json();
        if (data.success) {
            await updateCartUI();
            showNotification('Order placed successfully!', 'success');
        } else {
            showNotification('Failed to place order', 'error');
        }
    } catch (error) {
        console.error('Error in checkout process:', error);
        showNotification('Error processing your order', 'error');
    }
}

// Generate a simple SKU for products
function generateSKU(productName) {
    const prefix = 'UC'; // Unlikely Core
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const nameCode = productName.substring(0, 2).toUpperCase();
    return `${prefix}-${nameCode}-${randomNum}`;
}

// Track e-commerce events (placeholder for real analytics)
function trackEcommerceEvent(eventName, eventData) {
    console.log(`E-commerce Event: ${eventName}`, eventData);
    // In a real implementation, this would send data to Google Analytics, Facebook Pixel, etc.
    // Example: gtag('event', eventName, eventData);
}

// WISHLIST FUNCTIONS

// Toggle wishlist item
function toggleWishlistItem(button) {
    try {
        // Find the product card parent
        const productCard = button.closest('.product-card');
        
        if (!productCard) {
            console.error('Product card not found');
            showNotification('Error finding product information', 'error');
            return;
        }
        
        // Extract product details
        const productName = productCard.querySelector('h3').textContent;
        const productId = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Toggle wishlist state
        const isInWishlist = wishlist.includes(productId);
        
        if (isInWishlist) {
            // Remove from wishlist
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
            }
            button.classList.remove('active');
            showNotification(`${productName} removed from wishlist`, 'info');
        } else {
            // Add to wishlist
            wishlist.push(productId);
            button.classList.add('active');
            showNotification(`${productName} added to wishlist`, 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Update UI
        updateWishlistCount();
    } catch (error) {
        console.error('Error in toggleWishlistItem:', error);
        showNotification('Error updating wishlist', 'error');
    }
}

// Update wishlist count
function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (!wishlistCount) return;
    
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length > 0 ? 'block' : 'none';
}

// DOCUMENT READY
document.addEventListener('DOMContentLoaded', function() {
    // Generate persistent user ID
    const USER_ID = localStorage.getItem('userId') || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', USER_ID);

    // Initialize cart and wishlist
    updateCartCount();
    fetchCart();
    
    // Initialize slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slide-nav.prev');
    const nextButton = document.querySelector('.slide-nav.next');
    
    // Auto-advance slideshow
    let slideshowInterval = setInterval(() => {
        nextSlide();
    }, 5000);
    
    // MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-bar input');

    // Toggle menu on click
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            searchBar && searchBar.classList.remove('show'); // Close search when opening menu
        });
    }

    // Toggle search bar
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBar.classList.toggle('show');
            if (searchBar.classList.contains('show')) {
                searchInput && searchInput.focus();
                dropdownMenu && dropdownMenu.classList.remove('show'); // Close menu when opening search
            }
        });
    }

    // Close search bar
    if (searchClose && searchBar) {
        searchClose.addEventListener('click', function() {
            searchBar.classList.remove('show');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (dropdownMenu && searchBar && !e.target.closest('.menu-container') && !e.target.closest('.search-container')) {
            dropdownMenu.classList.remove('show');
            searchBar.classList.remove('show');
        }
    });

    // Handle search
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Add your search functionality here
                console.log('Searching for:', this.value);
                // You can implement the actual search logic here
            }
        });
    }

    // SLIDESHOW
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        if (!slides.length) return;
        
        // Remove active class with a delay to allow for exit animations
        slides.forEach(slide => {
            slide.style.transition = 'all 0.8s ease-in-out';
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class after a short delay
        setTimeout(() => {
            slides[currentSlide].style.transition = 'all 0.8s ease-in-out';
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }, 50);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
        });
    }

    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }

    // Auto advance slides
    let slideInterval;
    if (slides.length) {
        slideInterval = setInterval(nextSlide, 5000);

        // Pause auto-advance on hover
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            slideshow.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // BUTTONS & LINKS
    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const buttonText = this.textContent.trim().toLowerCase();
            
            switch(buttonText) {
                case 'shop now':
                case 'view collection':
                    const collections = document.getElementById('collections');
                    if (collections) {
                        collections.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    break;
                case 'learn more':
                    const aboutUs = document.getElementById('about-us');
                    if (aboutUs) {
                        aboutUs.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    break;
            }
        });
    });

    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ SECTION
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if (!answer) return;
            
            const isOpen = answer.classList.contains('show');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('show');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });

            // Open clicked answer if it wasn't open
            if (!isOpen) {
                answer.classList.add('show');
                question.classList.add('active');
            }
        });
    });

    // CART MODAL
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', async function() {
            if (cartModal) {
                cartModal.classList.add('active');
                await renderCartItems(); // Ensure cart is up to date
            }
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            if (cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'info');
            } else {
                await processCheckout();
            }
        });
    }

    // Close cart modal when clicking outside
    window.addEventListener('click', function(event) {
        if (cartModal && event.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Add to cart buttons
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

    // WISHLIST BUTTONS
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleWishlistItem(this);
        });
        
        // Initialize wishlist button state
        const productCard = button.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3').textContent;
            const productId = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            if (wishlist.includes(productId)) {
                button.classList.add('active');
            }
        }
    });

    // Product image carousel
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const prevBtn = card.querySelector('.carousel-btn.prev');
        const nextBtn = card.querySelector('.carousel-btn.next');
        const images = card.querySelectorAll('.product-image');
        
        if (prevBtn && nextBtn && images.length > 0) {
            let currentImageIndex = 0;
            
            // Find the active image index
            images.forEach((img, index) => {
                if (img.classList.contains('active')) {
                    currentImageIndex = index;
                }
            });
            
            // Previous image button
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Hide current image
                images[currentImageIndex].classList.remove('active');
                
                // Calculate previous index with wraparound
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                
                // Show new image
                images[currentImageIndex].classList.add('active');
            });
            
            // Next image button
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Hide current image
                images[currentImageIndex].classList.remove('active');
                
                // Calculate next index with wraparound
                currentImageIndex = (currentImageIndex + 1) % images.length;
                
                // Show new image
                images[currentImageIndex].classList.add('active');
            });
        }
    });
});