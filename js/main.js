// Main JavaScript for Neutron website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });

    // Add copy functionality to code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach((block, index) => {
            const pre = block.parentElement;
            const wrapper = document.createElement('div');
            wrapper.className = 'relative';
            
            // Wrap the pre element
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors opacity-0 group-hover:opacity-100';
            copyButton.textContent = 'Copy';
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');
            
            // Add group class to wrapper for hover effect
            wrapper.classList.add('group');
            wrapper.appendChild(copyButton);
            
            // Copy functionality
            copyButton.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.classList.remove('bg-green-600');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    copyButton.textContent = 'Error';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
            });
        });
    }

    // Add copy buttons after a short delay to ensure Prism has processed the code
    setTimeout(addCopyButtons, 100);

    // Active navigation highlighting
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav a[href]');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('text-gray-900');
                link.classList.remove('text-gray-500');
            }
        });
    }

    updateActiveNav();

    // Intersection Observer for sidebar navigation (docs page)
    function initSidebarNav() {
        const sidebarLinks = document.querySelectorAll('aside nav a[href^="#"]');
        if (sidebarLinks.length === 0) return;

        const sections = Array.from(sidebarLinks).map(link => {
            const href = link.getAttribute('href');
            return document.querySelector(href);
        }).filter(section => section !== null);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`aside nav a[href="#${id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    sidebarLinks.forEach(link => {
                        link.classList.remove('text-blue-600', 'bg-blue-50');
                        link.classList.add('text-gray-600');
                    });
                    
                    // Add active class to current link
                    if (navLink) {
                        navLink.classList.add('text-blue-600', 'bg-blue-50');
                        navLink.classList.remove('text-gray-600');
                    }
                }
            });
        }, {
            rootMargin: '-100px 0px -66%'
        });

        sections.forEach(section => observer.observe(section));
    }

    initSidebarNav();

    // Animate performance stats when they come into view
    function animateCounters() {
        const stats = document.querySelectorAll('.performance-stat');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const number = stat.querySelector('.text-4xl');
                    if (number && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        
                        // Simple counter animation could be added here
                        number.style.opacity = '0';
                        setTimeout(() => {
                            number.style.transition = 'opacity 0.5s ease';
                            number.style.opacity = '1';
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounters();

    // Add hover effects to feature cards
    function initFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    initFeatureCards();

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });

    // Add loading state for code blocks
    function addCodeBlockLoading() {
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(block => {
            // Add loading animation initially
            block.classList.add('code-loading');
            
            // Remove loading animation after content is ready
            setTimeout(() => {
                block.classList.remove('code-loading');
            }, 300);
        });
    }

    // Initialize code block loading
    addCodeBlockLoading();

    // Console Easter Egg
    console.log(`
    ███╗   ██╗███████╗██╗   ██╗████████╗██████╗  ██████╗ ███╗   ██╗
    ████╗  ██║██╔════╝██║   ██║╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║
    ██╔██╗ ██║█████╗  ██║   ██║   ██║   ██████╔╝██║   ██║██╔██╗ ██║
    ██║╚██╗██║██╔══╝  ██║   ██║   ██║   ██╔══██╗██║   ██║██║╚██╗██║
    ██║ ╚████║███████╗╚██████╔╝   ██║   ██║  ██║╚██████╔╝██║ ╚████║
    ╚═╝  ╚═══╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
    
    Welcome to Neutron! 🚀
    Check out the source code: https://github.com/yasakei/neutron
    `);
});

// Theme detection and system preference handling
(function() {
    // Check for system dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // This could be used for future dark mode implementation
    function handleThemeChange(e) {
        // Future dark mode toggle functionality could go here
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    }
    
    prefersDark.addEventListener('change', handleThemeChange);
})();

// Performance monitoring
(function() {
    // Simple performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Report Core Web Vitals if available
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log(`${entry.name}: ${Math.round(entry.value)}ms`);
                });
            });
            
            // Observe paint timing
            try {
                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                // Ignore if not supported
            }
        }
    });
})();
