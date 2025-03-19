document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Form submission handling
    const lostForm = document.getElementById('lost-form');
    const foundForm = document.getElementById('found-form');
    const successModal = document.getElementById('success-modal');
    
    if (lostForm) {
        lostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
    
    if (foundForm) {
        foundForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
    
    function handleFormSubmission(form) {
        // Get form data
        const formData = new FormData(form);
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just log it and show a success message
        console.log('Form submitted with the following data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Show success modal
        if (successModal) {
            successModal.style.display = 'block';
        }
        
        // Reset the form
        form.reset();
    }
    
    // Date field default to today
    const dateFields = document.querySelectorAll('input[type="date"]');
    
    if (dateFields.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        
        dateFields.forEach(field => {
            field.value = today;
            field.max = today; // Can't select future dates
        });
    }
    
    // Image preview functionality
    const imageInputs = document.querySelectorAll('input[type="file"]');
    
    if (imageInputs.length > 0) {
        imageInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    const fileSize = (this.files[0].size / 1024).toFixed(2);
                    
                    // Create or update file info
                    let fileInfo = document.createElement('div');
                    fileInfo.className = 'file-info';
                    fileInfo.innerHTML = `
                        <p>Selected file: ${fileName}</p>
                        <p>Size: ${fileSize} KB</p>
                    `;
                    
                    // Remove any existing file info
                    const existingFileInfo = this.parentElement.querySelector('.file-info');
                    if (existingFileInfo) {
                        existingFileInfo.remove();
                    }
                    
                    // Add the new file info after the input
                    this.parentElement.appendChild(fileInfo);
                }
            });
        });
    }
});