document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('.parallax-section');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // ── Navbar: transparent → solid on scroll ──
    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ── Active nav link highlighting ──
    function handleActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ── Scroll parallax for philosopher images ──
    const philosopherWraps = document.querySelectorAll('.philosopher-wrap');

    function handlePhilosopherParallax() {
        philosopherWraps.forEach(wrap => {
            const section = wrap.closest('.parallax-section');
            const rect = section.getBoundingClientRect();
            const viewH = window.innerHeight;
            // Progress: 0 when section enters bottom, 1 when it exits top
            const progress = 1 - (rect.bottom / (viewH + section.offsetHeight));
            const translateY = (progress - 0.5) * 60; // shift +/-30px
            wrap.style.transform = 'translateY(' + translateY + 'px)';
        });
    }

    window.addEventListener('scroll', () => {
        handleNavScroll();
        handleActiveLink();
        handlePhilosopherParallax();
    }, { passive: true });

    // ── Hamburger menu toggle ──
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── Fade-in on scroll (IntersectionObserver) ──
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // Trigger hero animations immediately
    handleNavScroll();
    handleActiveLink();
});
