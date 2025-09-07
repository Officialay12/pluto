        document.addEventListener('DOMContentLoaded', function() {
            // Initialize animations with GSAP
            gsap.registerPlugin(ScrollTrigger);
            
            // Mobile menu toggle
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    mobileToggle.innerHTML = navMenu.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                });
                
                // Close menu when clicking on links
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    });
                });
            }
            
            // Preloader functionality
            const preloader = document.getElementById('preloader');
            const progressBar = document.querySelector('.progress');
            
            // Function to hide preloader and show content
            function hidePreloader() {
                if (preloader && !preloader.classList.contains('hidden')) {
                    preloader.classList.add('hidden');
                    initAnimations();
                }
            }
            
            // Simulate loading progress with a fallback timeout
            if (preloader && progressBar) {
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(progressInterval);
                        setTimeout(hidePreloader, 500);
                    }
                    progressBar.style.width = `${progress}%`;
                }, 200);
                
                // Fallback in case something goes wrong
                setTimeout(hidePreloader, 4000);
            } else {
                // If preloader doesn't exist, initialize animations immediately
                initAnimations();
            }
            
            // Initialize all animations
            function initAnimations() {
                // Animate hero content
                gsap.from('.hero-title', {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out'
                });
                
                gsap.from('.hero-subtitle', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    delay: 0.3,
                    ease: 'power3.out'
                });
                
                gsap.from('.hero-actions', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    delay: 0.6,
                    ease: 'power3.out'
                });
                
                gsap.from('.stat-item', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    stagger: 0.2,
                    delay: 0.9,
                    ease: 'power3.out'
                });
                
                // Animate section headers on scroll
                gsap.utils.toArray('.section-header').forEach(section => {
                    gsap.from(section, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1
                    });
                });
                
                // Animate template cards on scroll
                gsap.utils.toArray('.template-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1
                    });
                });
                
                // Animate model cards on scroll
                gsap.utils.toArray('.model-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1
                    });
                });
                
                // Animate feature cards on scroll
                gsap.utils.toArray('.feature-card').forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1
                    });
                });
                
                // Animate testimonials on scroll
                gsap.utils.toArray('.testimonial').forEach((testimonial, i) => {
                    gsap.from(testimonial, {
                        scrollTrigger: {
                            trigger: testimonial,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        delay: i * 0.2
                    });
                });
                
                // Header scroll effect
                const header = document.querySelector('header');
                if (header) {
                    ScrollTrigger.create({
                        start: 'top -50',
                        end: 99999,
                        toggleClass: { className: 'scrolled', targets: header },
                        onUpdate: (self) => {
                            if (self.direction === -1) {
                                header.style.background = 'rgba(18, 18, 18, 0.95)';
                                header.style.backdropFilter = 'blur(10px)';
                            } else {
                                header.style.background = 'rgba(18, 18, 18, 0.8)';
                            }
                        }
                    });
                }
                
                // Smooth scrolling for navigation links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;
                        
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            // Close mobile menu if open
                            if (navMenu && navMenu.classList.contains('active')) {
                                navMenu.classList.remove('active');
                                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                            }
                            
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
                
                // Initialize simple 3D background effect
                init3DEffect();
            }
            
            // Simple 3D background effect
            function init3DEffect() {
                const floatingElements = document.querySelectorAll('.floating-element');
                
                // Only add this effect on non-mobile devices
                if (window.innerWidth > 768) {
                    floatingElements.forEach(element => {
                        window.addEventListener('mousemove', (e) => {
                            const moveX = (e.clientX - window.innerWidth / 2) / 25;
                            const moveY = (e.clientY - window.innerHeight / 2) / 25;
                            
                            gsap.to(element, {
                                x: moveX,
                                y: moveY,
                                duration: 2,
                                ease: 'power2.out'
                            });
                        });
                    });
                }
            }
        });