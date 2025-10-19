document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.querySelector('.main-header');
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- 1. STICKY HEADER SCROLL LOGIC (Retained) ---
    const scrollThreshold = 80; 

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            // Added 'scrolled' class to the main header if needed for future style changes
       
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- 2. HAMBURGER MENU TOGGLE LOGIC (New) ---

    // Function to open/close the mobile menu
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' ||
            false;
        // Toggle the 'nav-open' class for CSS sliding transition
        navbar.classList.toggle('nav-open');
        // Update ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        // Optional: Toggle body overflow to prevent background scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    }

    // Event listener for the hamburger button click
    menuToggle.addEventListener('click', toggleMenu);
    // Function to close the menu after a link is clicked
    function closeMenu() {
        // Updated breakpoint to 768px to match CSS
        if (window.innerWidth <= 768 && navbar.classList.contains('nav-open')) {
            navbar.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Add event listeners to all navigation links to close the menu on click (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    // Optional: Add a listener for resizing to close the menu if resized to desktop view
    window.addEventListener('resize', closeMenu);
});