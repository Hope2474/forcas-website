// ==========================================
// FORCAS WEBSITE - MAIN JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. NEWSLETTER SUBSCRIPTION WITH DATABASE
    // ==========================================
    
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');
    
    if (newsletterForm && emailInput && messageDiv) {
        
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Validate email
            if (!email) {
                showMessage('⚠️ Please enter your email address.', 'error');
                emailInput.focus();
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('⚠️ Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            // Loading state
            const subscribeBtn = document.getElementById('subscribeBtn');
            const originalText = subscribeBtn.innerHTML;
            subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            subscribeBtn.disabled = true;
            
            try {
                const response = await fetch('api/subscribe.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showMessage('✅ ' + data.message, 'success');
                    emailInput.value = '';
                    createConfetti();
                } else {
                    showMessage('⚠️ ' + data.message, 'error');
                }
                
            } catch (error) {
                console.error('Error:', error);
                showMessage('⚠️ Connection error. Please try again.', 'error');
            }
            
            subscribeBtn.innerHTML = originalText;
            subscribeBtn.disabled = false;
        });
    }
    
    // Helper: Show messages
    function showMessage(text, type) {
        const messageDiv = document.getElementById('newsletterMessage');
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = 'newsletter-message ' + type;
            setTimeout(() => {
                messageDiv.className = 'newsletter-message';
            }, 5000);
        }
    }
    
    // Helper: Confetti effect
    function createConfetti() {
        const colors = ['#f4b942', '#0b2a3e', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 2px;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);

}
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 2. MOBILE NAV TOGGLE
    // ==========================================
    
    const toggleBtn = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const nav = document.getElementById('navbar');
            if (nav && !nav.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
    
    // ==========================================
    // 3. SMOOTH SCROLLING NAVIGATION
    // ==========================================
    
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's external or empty
            if (targetId === '#' || targetId === '' || targetId.includes('.html')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu
                navLinks.classList.remove('open');
                const icon = toggleBtn?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ==========================================
    // 4. ACTIVE LINK HIGHLIGHTING
    // ==========================================
    
    const sections = document.querySelectorAll('section[id], h2[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // 5. DONATE BUTTON (Goes to donate.html)
    // ==========================================
    
    const donateBtn1 = document.getElementById('donateBtn');
    const donateBtn2 = document.getElementById('donateBtn2');
    
    // No need to prevent default - just let them navigate to donate.html 
    
    console.log('FORCAS Website - Database Integration Ready ✅');
});

// ==========================================
// HERO PARTICLES BACKGROUND
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const colors = ['#f4b942', '#ffffff', '#e0a832', '#ffd700', '#ff6b6b'];
    const numParticles = 25;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 2;
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            position: absolute;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatParticle ${6 + Math.random() * 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
    
    // Add keyframes if not already added
    if (!document.querySelector('#particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-40px) scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
});