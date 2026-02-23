document.addEventListener('DOMContentLoaded', () => {
 
    // 2. Intersection Observer for Stats 
    const observerOptions = { threshold: 0.1 };

    const animateSection = () => {
        // A. MAIN COUNTERS (Gauges)
        document.querySelectorAll('.count').forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            if (!isNaN(target)) {
                animateValue(counter, target, true, true);
            }
        });

        // B. LIST & AI COUNTERS
        document.querySelectorAll('.sentiment-list li strong, .sources strong, .ai-box span').forEach(tag => {
            const text = tag.innerText;
            const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(numericValue)) {
                const isPercentage = text.includes('%') || tag.parentElement.classList.contains('ai-box');
                animateValue(tag, numericValue, false, isPercentage);
            }
        });

        // C. GAUGE SVG ANIMATION
        const offsets = { 'fill-1': 0.78, 'fill-2': 0.82, 'fill-3': 0.40, 'fill-4': 0.65 };
        Object.keys(offsets).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                // Use a slight delay to allow the browser to register the change
                setTimeout(() => {
                    el.style.transition = "stroke-dashoffset 2s ease-in-out";
                    el.style.strokeDashoffset = 185 - (185 * offsets[id]);
                }, 200);
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    } else {
        // Fail-safe: If observer fails, run animation anyway after 1s
        setTimeout(animateSection, 1000);
    }

    // 3. REUSABLE ANIMATION ENGINE
    function animateValue(obj, target, hasPlus, hasPercent) {
        let startTime = null;
        const duration = 2000;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = progress * target;
            const formattedNum = current.toFixed(target % 1 === 0 ? 0 : 2);
            
            let displayVal = (hasPlus ? '+' : '') + formattedNum + (hasPercent ? '%' : '');

            if (obj.classList.contains('ai-box') || obj.parentElement.classList.contains('ai-box')) {
                obj.innerHTML = `<img src="./Assets/Logo, Icons, Graphics, Visual Assets/Check Icon.svg" class="sent-icon"> GG AI: ${formattedNum}% <span class="purple-text">Bullish</span>`;
            } else {
                obj.innerText = displayVal;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Final snap to exact target
                let finalVal = (hasPlus ? '+' : '') + target + (hasPercent ? '%' : '');
                if (obj.classList.contains('ai-box') || obj.parentElement.classList.contains('ai-box')) {
                    obj.innerHTML = `<img src="./Assets/Logo, Icons, Graphics, Visual Assets/Check Icon.svg" class="sent-icon"> GG AI: ${target}% <span class="purple-text">Bullish</span>`;
                } else {
                    obj.innerText = finalVal;
                }
            }
        }
        window.requestAnimationFrame(step);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const overlay = document.getElementById('playOverlay');

    overlay.addEventListener('click', () => {
        // 1. Play the video
        video.play();
        
        // 2. Ensure volume is up  
        video.muted = false; 
        video.volume = 0.5;

        // 3. Hide the overlay
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });
});




// For card Animation 
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pillar-card');

    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on the card's index (0.2s, 0.4s, 0.6s...)
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 200); 
                
                // Stop watching once the animation is done
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});