document.addEventListener('DOMContentLoaded', () => {
    // AR Experience Controls
    const startARBtn = document.getElementById('startAR');
    const closeARBtn = document.getElementById('closeAR');
    const arExperience = document.getElementById('arExperience');
    const tutorialBtn = document.getElementById('tutorialBtn');
    const tutorial = document.getElementById('tutorial');

    if (startARBtn) {
        startARBtn.addEventListener('click', () => {
            // Check if browser supports WebXR
            if ('xr' in navigator) {
                navigator.xr.isSessionSupported('immersive-ar')
                    .then((supported) => {
                        if (supported) {
                            arExperience.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                        } else {
                            showNotification('AR không được hỗ trợ trên trình duyệt của bạn', 'error');
                        }
                    });
            } else {
                showNotification('Trình duyệt của bạn không hỗ trợ AR', 'error');
            }
        });
    }

    if (closeARBtn) {
        closeARBtn.addEventListener('click', () => {
            arExperience.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', () => {
            tutorial.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // AR Filters
    const filterButtons = document.querySelectorAll('.try-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Check if device has camera access
            if ('mediaDevices' in navigator) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        // Stop the stream immediately as we just wanted to check permission
                        stream.getTracks().forEach(track => track.stop());
                        showNotification('Tính năng đang được phát triển', 'info');
                    })
                    .catch(() => {
                        showNotification('Vui lòng cho phép truy cập camera', 'error');
                    });
            }
        });
    });

    // AR Games
    const gameButtons = document.querySelectorAll('.play-game-btn');
    gameButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Game đang được phát triển', 'info');
        });
    });

    // Community Posts Interaction
    const posts = document.querySelectorAll('.community-post');
    posts.forEach(post => {
        const stats = post.querySelector('.post-stats');
        if (stats) {
            stats.querySelectorAll('span').forEach(stat => {
                stat.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('fas')) {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    } else {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    }
                });
            });
        }
    });

    // Feature Cards Animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Tutorial Steps Animation
    const tutorialSteps = document.querySelectorAll('.tutorial-step');
    const tutorialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    tutorialSteps.forEach(step => tutorialObserver.observe(step));

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(notification);

        // Add active class after a small delay to trigger animation
        setTimeout(() => notification.classList.add('active'), 10);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add dynamic styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .notification.active {
            transform: translateX(0);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .notification.error {
            background: #ff4757;
            color: white;
        }

        .notification.info {
            background: #2e86de;
            color: white;
        }
    `;
    document.head.appendChild(style);

    // Download Buttons Animation
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.transform = `scaleX(${progress / 100})`;
        });
    }

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
});
