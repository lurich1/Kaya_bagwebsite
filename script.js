document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Create mobile menu and overlay if they don't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone navigation items
        const navItems = document.querySelector('.main-nav ul').cloneNode(true);
        mobileMenu.appendChild(navItems);
        
        // Add action buttons
        const mobileActions = document.createElement('div');
        mobileActions.className = 'mobile-menu-actions';
        mobileActions.innerHTML = `
            <a href="#" class="btn-secondary">Log In</a>
            <a href="#" class="btn-primary">Get Started</a>
        `;
        mobileMenu.appendChild(mobileActions);
        
        document.body.appendChild(mobileMenu);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        
        // Toggle mobile menu
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when overlay is clicked
        overlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    }
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (testimonials.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            showTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials
        let testimonialInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 8000);
        
        // Pause auto-rotation when user interacts with controls
        const controls = [prevBtn, nextBtn, ...dots];
        controls.forEach(control => {
            control.addEventListener('click', () => {
                clearInterval(testimonialInterval);
                
                // Restart after a delay
                testimonialInterval = setInterval(() => {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= testimonials.length) newIndex = 0;
                    showTestimonial(newIndex);
                }, 8000);
            });
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step-card, .section-header, .testimonial-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card, .step-card, .section-header, .testimonial-content {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Initial check for animations
    setTimeout(animateOnScroll, 100);
    
    // Check for animations on scroll
    window.addEventListener('scroll', animateOnScroll);
});