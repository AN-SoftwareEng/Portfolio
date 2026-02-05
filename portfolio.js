/**
 * ARP Portfolio Logic - MASTER CONSOLIDATED
 * 1. Navigation & Tracking: Handles tab switching and active states.
 * 2. Mobile Optimization: Manages viewport resets and scroll behavior.
 * 3. Timeline Visibility: Handles entrance animations for career milestones.
 * 4. Interactive Skills Spotlight: The radial engine for skill cards.
 * 5. Terminal & System Reflection: Link between contact form and terminal logs.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1 & 2. NAVIGATION & MOBILE SCROLLING ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const viewport = document.querySelector('.viewport');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Set active button state
            navButtons.forEach(nav => nav.classList.remove('active'));
            btn.classList.add('active');

            // Switch sections with deep-link logic
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                    
                    // Reset scroll for mobile/desktop viewports (Section 2)
                    viewport.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // --- 3. TIMELINE VISIBILITY (Auto-Activation) ---
                    if(targetTab === 'experience') {
                        const cards = content.querySelectorAll('.timeline-card');
                        cards.forEach((card, index) => {
                            // Staggered reveal for a high-end custom feel
                            setTimeout(() => {
                                card.style.opacity = "1";
                                card.style.transform = "translateY(0)";
                                card.style.filter = "blur(0)";
                            }, index * 100);
                        });
                    }
                }
            });
        });
    });

    // --- 4. INTERACTIVE SKILLS SPOTLIGHT (Radial Engine) ---
    // Mistake 2 Fix: Uses hardware-accelerated CSS variables
    if (window.matchMedia("(pointer: fine)").matches) {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    }

    // --- 5. TERMINAL SIMULATION & CONTACT REFLECTION ---
    const terminalBody = document.querySelector('.t-body');
    
    // Helper to log system events (Mistake 3: Self-Reflection)
    const logSys = (msg, isSuccess = false) => {
        if (!terminalBody) return;
        const p = document.createElement('p');
        p.style.fontSize = "0.75rem";
        p.innerHTML = `<span class="t-meta">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        if (isSuccess) p.style.color = "#27c93f";
        terminalBody.insertBefore(p, cursorLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    let cursorLine;
    if (terminalBody) {
        cursorLine = document.createElement('p');
        cursorLine.innerHTML = '<span class="t-user">arp@dev:~$</span> <span class="terminal-cursor">_</span>';
        terminalBody.appendChild(cursorLine);

        const cursor = cursorLine.querySelector('.terminal-cursor');
        setInterval(() => {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 530);
    }

    // Contact Form "Transmit" logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.transmit-btn');
            
            logSys("INITIATING ENCRYPTED UPLINK...");
            btn.innerText = "UPLOADING_PAYLOAD...";
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = "TRANSMISSION_COMPLETE";
                btn.style.background = "#27c93f";
                logSys("SUCCESS: MESSAGE_DELIVERED", true);
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerText = "TRANSMIT_DATA";
                    btn.style.background = "var(--accent)";
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});