document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    });

    // Platform Tabs
    const platformTabs = document.querySelectorAll('.platform-tab');
    const trendLists = document.querySelectorAll('.trend-list');

    platformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and lists
            platformTabs.forEach(t => t.classList.remove('active'));
            trendLists.forEach(list => list.classList.remove('active'));

            // Add active class to clicked tab and corresponding list
            tab.classList.add('active');
            const platform = tab.dataset.platform;
            document.getElementById(`${platform}-trends`).classList.add('active');
        });
    });

    // Dynamic Stats Counter
    const stats = document.querySelectorAll('.stat-info h3');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                animateValue(target, 0, value, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = formatNumber(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    }

    // Platform Icons Animation
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', () => {
            platform.querySelector('i').style.transform = 'translateY(-5px) scale(1.1)';
        });

        platform.addEventListener('mouseleave', () => {
            platform.querySelector('i').style.transform = 'translateY(0) scale(1)';
        });
    });

    // Trend Items Hover Effect
    const trendItems = document.querySelectorAll('.trend-item');
    trendItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.trend-overlay');
            overlay.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.trend-overlay');
            overlay.style.opacity = '0';
        });
    });

    // Follow Button Effect
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.classList.contains('followed')) {
                this.innerHTML = '<i class="fas fa-check"></i> Following';
                this.classList.add('followed');
            } else {
                this.innerHTML = '<i class="fas fa-plus"></i> Follow';
                this.classList.remove('followed');
            }
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message fade-in-up';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Cảm ơn bạn đã đăng ký!
            `;
            newsletterForm.innerHTML = '';
            newsletterForm.appendChild(successMsg);
        }
    });

    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-right');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => elementObserver.observe(el));

    // Trending Tag Animation
    const trendingTag = document.querySelector('.trending-tag i');
    setInterval(() => {
        trendingTag.style.transform = 'scale(1.2)';
        setTimeout(() => {
            trendingTag.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
});
