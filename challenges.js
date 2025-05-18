// Challenges page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Featured Challenges Slider
    const featuredSlides = document.querySelectorAll('.featured-slide');
    const featuredDots = document.querySelectorAll('.featured-dots .dot');
    const prevFeatured = document.getElementById('prevFeatured');
    const nextFeatured = document.getElementById('nextFeatured');
    let currentFeatured = 0;

    function showFeaturedSlide(index) {
        // Hide all slides
        featuredSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        featuredDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        featuredSlides[index].classList.add('active');
        featuredDots[index].classList.add('active');
    }

    // Initialize dots click event
    featuredDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentFeatured = index;
            showFeaturedSlide(currentFeatured);
        });
    });

    // Previous button click event
    if (prevFeatured) {
        prevFeatured.addEventListener('click', () => {
            currentFeatured--;
            if (currentFeatured < 0) {
                currentFeatured = featuredSlides.length - 1;
            }
            showFeaturedSlide(currentFeatured);
        });
    }

    // Next button click event
    if (nextFeatured) {
        nextFeatured.addEventListener('click', () => {
            currentFeatured++;
            if (currentFeatured >= featuredSlides.length) {
                currentFeatured = 0;
            }
            showFeaturedSlide(currentFeatured);
        });
    }

    // Auto-advance the slider every 5 seconds
    setInterval(() => {
        currentFeatured++;
        if (currentFeatured >= featuredSlides.length) {
            currentFeatured = 0;
        }
        showFeaturedSlide(currentFeatured);
    }, 5000);

    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            // In a real application, this would filter the challenges based on the selected options
            // For now, we'll just show an alert
            alert('Filtering challenges based on your selections!');
        });
    }

    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all pagination buttons
                paginationBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to the clicked button
                this.classList.add('active');
                
                // In a real application, this would load the corresponding page of challenges
                // For now, we'll just show an alert if it's not the "Next" button
                if (!this.classList.contains('next')) {
                    // alert('Loading page ' + this.textContent);
                }
            });
        });
    }
});