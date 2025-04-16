document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle --- //
    const themeToggleButton = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleButton.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // --- Sticky Nav & Scrollspy --- //
    const nav = document.querySelector('.sticky-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section'); // Select sections within main
    const navHeight = nav ? nav.offsetHeight : 60; // Fallback height

    function changeActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + navHeight < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        // Ensure the index is valid before trying to add the class
        if (index >= 0 && index < navLinks.length) {
             navLinks[index].classList.add('active');
        }
       
        // Add scrolled class to nav after scrolling past a certain point
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Initial call in case the page loads scrolled
    changeActiveLink(); 
    // Add listener for scroll events
    window.addEventListener('scroll', changeActiveLink);

    // --- Mobile Navigation Toggle --- //
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinksContainer) {
        mobileNavToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Optional: Change icon based on state
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                 icon.className = navLinksContainer.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }

    // --- Smooth Scroll for Nav Links --- //
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Calculate position considering the sticky nav height
                const targetPosition = targetSection.offsetTop - navHeight + 1; // +1 for slight offset
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open after clicking a link
                if (navLinksContainer.classList.contains('active')) {
                     navLinksContainer.classList.remove('active');
                     const icon = mobileNavToggle.querySelector('i');
                     if (icon) icon.className = 'fas fa-bars';
                }
            }
        });
    });

     // --- Section Fade-in Animation on Scroll (Simple Example) --- //
    const observerOptions = {
        root: null, // relative to document viewport 
        rootMargin: '0px',
        threshold: 0.1 // 10% visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target); 
            }
            // Optional: remove class if element scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Accordion Toggle --- //
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Find the content and toggle button within the same section/card
            const content = header.nextElementSibling; // Assumes content is directly after header
            const toggle = header.querySelector('.toggle-btn');

            if (content && content.classList.contains('section-content') && toggle) {
                // Toggle the clicked section
                content.classList.toggle('active');
                toggle.classList.toggle('active');
                
                // Optional: Close other sections when one is opened
                // sectionHeaders.forEach(otherHeader => {
                //     if (otherHeader !== header) {
                //         const otherContent = otherHeader.nextElementSibling;
                //         const otherToggle = otherHeader.querySelector('.toggle-btn');
                //         if (otherContent && otherContent.classList.contains('section-content') && otherToggle) {
                //             otherContent.classList.remove('active');
                //             otherToggle.classList.remove('active');
                //         }
                //     }
                // });
            }
        });
    });

}); 