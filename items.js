document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real application, this would come from a database
    const allItems = [
        {
            id: 1,
            name: 'Blue Backpack',
            category: 'accessories',
            location: 'library',
            date: '2025-03-15',
            image: 'images/items/backpack.jpg',
            description: 'A blue Jansport backpack with a laptop compartment and water bottle pocket.'
        },
        {
            id: 2,
            name: 'Student ID Card',
            category: 'ids',
            location: 'student-union',
            date: '2025-03-17',
            image: 'images/items/id-card.jpg',
            description: 'Student ID card for John Smith, ID #12345678.'
        },
        {
            id: 3,
            name: 'Water Bottle',
            category: 'other',
            location: 'gym',
            date: '2025-03-18',
            image: 'images/items/water-bottle.jpg',
            description: 'A blue Hydro Flask water bottle with stickers on it.'
        },
        {
            id: 4,
            name: 'Laptop Charger',
            category: 'electronics',
            location: 'science-building',
            date: '2025-03-19',
            image: 'images/items/laptop-charger.jpg',
            description: 'A MacBook Pro charger with USB-C connector.'
        },
        {
            id: 5,
            name: 'Textbook',
            category: 'books',
            location: 'library',
            date: '2025-03-16',
            image: 'images/items/textbook.jpg',
            description: 'Introduction to Psychology textbook, 5th edition.'
        },
        {
            id: 6,
            name: 'Umbrella',
            category: 'accessories',
            location: 'arts-center',
            date: '2025-03-14',
            image: 'images/items/umbrella.jpg',
            description: 'A black compact umbrella with automatic open/close.'
        },
        {
            id: 7,
            name: 'Glasses',
            category: 'accessories',
            location: 'cafeteria',
            date: '2025-03-13',
            image: 'images/items/glasses.jpg',
            description: 'Black-rimmed prescription glasses in a blue case.'
        },
        {
            id: 8,
            name: 'Wireless Earbuds',
            category: 'electronics',
            location: 'gym',
            date: '2025-03-12',
            image: 'images/items/earbuds.jpg',
            description: 'White wireless earbuds with charging case.'
        },
        {
            id: 9,
            name: 'Scarf',
            category: 'clothing',
            location: 'student-union',
            date: '2025-03-11',
            image: 'images/items/scarf.jpg',
            description: 'A red and black plaid scarf.'
        },
        {
            id: 10,
            name: 'Calculator',
            category: 'electronics',
            location: 'science-building',
            date: '2025-03-10',
            image: 'images/items/calculator.jpg',
            description: 'TI-84 Plus graphing calculator.'
        },
        {
            id: 11,
            name: 'Debit Card',
            category: 'ids',
            location: 'cafeteria',
            date: '2025-03-09',
            image: 'images/items/debit-card.jpg',
            description: 'Chase debit card ending in 1234.'
        },
        {
            id: 12,
            name: 'Notebook',
            category: 'books',
            location: 'library',
            date: '2025-03-08',
            image: 'images/items/notebook.jpg',
            description: 'Spiral-bound notebook with blue cover, contains biology notes.'
        }
    ];
    
    // Variables for pagination
    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredItems = [...allItems];
    
    // DOM elements
    const itemsGrid = document.getElementById('items-grid');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const dateFilter = document.getElementById('date-filter');
    
    // Initialize the page
    loadItems();
    
    // Event listeners for filters
    if (searchButton) {
        searchButton.addEventListener('click', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
    
    // Event listeners for pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadItems();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadItems();
            }
        });
    }
    
    // Function to apply filters
    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        const location = locationFilter ? locationFilter.value : 'all';
        const dateRange = dateFilter ? dateFilter.value : 'all';
        
        filteredItems = allItems.filter(item => {
            // Search term filter
            const matchesSearch = searchTerm === '' || 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = category === 'all' || item.category === category;
            
            // Location filter
            const matchesLocation = location === 'all' || item.location === location;
            
            // Date filter
            let matchesDate = true;
            if (dateRange !== 'all') {
                const itemDate = new Date(item.date);
                const today = new Date();
                
                if (dateRange === 'today') {
                    matchesDate = itemDate.toDateString() === today.toDateString();
                } else if (dateRange === 'week') {
                    const weekAgo = new Date();
                    weekAgo.setDate(today.getDate() - 7);
                    matchesDate = itemDate >= weekAgo;
                } else if (dateRange === 'month') {
                    const monthAgo = new Date();
                    monthAgo.setMonth(today.getMonth() - 1);
                    matchesDate = itemDate >= monthAgo;
                }
            }
            
            return matchesSearch && matchesCategory && matchesLocation && matchesDate;
        });
        
        // Reset to first page after filtering
        currentPage = 1;
        loadItems();
    }
    
    // Function to load items
    function loadItems() {
        if (!itemsGrid) return;
        
        // Clear the grid
        itemsGrid.innerHTML = '';
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
        
        // Update pagination controls
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
        }
        
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }
        
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        // Display items for current page
        const currentItems = filteredItems.slice(startIndex, endIndex);
        
        if (currentItems.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = '<p>No items match your search criteria. Try adjusting your filters.</p>';
            itemsGrid.appendChild(noResults);
            return;
        }
        
        currentItems.forEach(item => {
            const itemCard = createItemCard(item);
            itemsGrid.appendChild(itemCard);
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
                <span class="item-category">${getCategoryName(item.category)}</span>
                <h3 class="item-title">${item.name}</h3>
                <div class="item-location">
                    <img src="images/location-icon.svg" alt="Location">
                    ${getLocationName(item.location)}
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
    
    // Function to get readable category name
    function getCategoryName(category) {
        const categories = {
            'electronics': 'Electronics',
            'clothing': 'Clothing',
            'accessories': 'Accessories',
            'books': 'Books & Notes',
            'ids': 'IDs & Cards',
            'other': 'Other'
        };
        
        return categories[category] || category;
    }
    
    // Function to get readable location name
    function getLocationName(location) {
        const locations = {
            'library': 'Library',
            'student-union': 'Student Union',
            'science-building': 'Science Building',
            'arts-center': 'Arts Center',
            'gym': 'Gymnasium',
            'cafeteria': 'Cafeteria',
            'other': 'Other'
        };
        
        return locations[location] || location;
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
                    <p><strong>Category:</strong> ${getCategoryName(item.category)}</p>
                    <p><strong>Location Found:</strong> ${getLocationName(item.location)}</p>
                    <p><strong>Date Found:</strong> ${formattedDate}</p>
                    <p><strong>Description:</strong> ${item.description}</p>
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
});