document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0 && dots.length > 0) {
        // Set up automatic slider
        setInterval(nextTestimonial, 5000);
        
        // Set up dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal, .close-btn');
    
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Load recent items on homepage
    const recentItemsGrid = document.getElementById('recent-items-grid');
    
    if (recentItemsGrid) {
        loadRecentItems();
    }
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    
                    animateCounter(target, 0, countTo, 2000);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerText = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});

// Function to load recent items
function loadRecentItems() {
    const recentItemsGrid = document.getElementById('recent-items-grid');
    
    if (!recentItemsGrid) return;
    
    // Sample data - in a real application, this would come from a database
    const recentItems = [
        {
            id: 1,
            name: 'Blue Backpack',
            category: 'Accessories',
            location: 'Library, 2nd Floor',
            date: '2025-03-15',
            image: 'Src\BlueBackpack.png'
        },
        {
            id: 2,
            name: 'Student ID Card',
            category: 'IDs & Cards',
            location: 'Student Union',
            date: '2025-03-17',
            image: 'Src\StudentIDCard.webp'
        },
        {
            id: 3,
            name: 'Water Bottle',
            category: 'Other',
            location: 'Gymnasium',
            date: '2025-03-18',
            image: 'Src\WaterBottle.webp'
        },
        {
            id: 4,
            name: 'Laptop Charger',
            category: 'Electronics',
            location: 'Science Building',
            date: '2025-03-19',
            image: 'Src\LaptopCharger.webp'
        }
    ];
    
    // Display only the first 3 items
    const itemsToShow = recentItems.slice(0, 3);
    
    itemsToShow.forEach(item => {
        const itemCard = createItemCard(item);
        recentItemsGrid.appendChild(itemCard);
    });
}

// Function to create an item card
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('data-id', item.id);
    
    // Format the date
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
            <span class="item-category">${item.category}</span>
            <h3 class="item-title">${item.name}</h3>
            <div class="item-location">
                <img src="images/location-icon.svg" alt="Location">
                ${item.location}
            </div>
            <div class="item-date">
                <img src="images/calendar-icon.svg" alt="Date">
                Found on ${formattedDate}
            </div>
        </div>
    `;
    
    // Add click event to open modal with item details
    card.addEventListener('click', function() {
        openItemModal(item);
    });
    
    return card;
}

// Function to open item modal
function openItemModal(item) {
    const modal = document.getElementById('item-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    // Format the date
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    modalBody.innerHTML = `
        <div class="modal-item">
            <div class="modal-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="modal-item-details">
                <h2>${item.name}</h2>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location Found:</strong> ${item.location}</p>
                <p><strong>Date Found:</strong> ${formattedDate}</p>
                <p><strong>Status:</strong> Available for Claim</p>
                <div class="modal-actions">
                    <button class="btn btn-primary claim-btn">Claim This Item</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener to claim button
    const claimBtn = modalBody.querySelector('.claim-btn');
    if (claimBtn) {
        claimBtn.addEventListener('click', function() {
            alert('Please visit the Lost & Found office to claim this item.');
            modal.style.display = 'none';
        });
    }
    
    modal.style.display = 'block';
}
