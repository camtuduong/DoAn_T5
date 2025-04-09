document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    });

    // Category Buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPosts(btn.dataset.category);
        });
    });

    // Filter Posts
    function filterPosts(category) {
        const posts = document.querySelectorAll('.blog-card');
        posts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = 'block';
                post.classList.add('fade-in-up');
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Load More Posts
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentPage = 1;

    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.querySelector('span').style.opacity = '0';
        loadMoreBtn.querySelector('.fa-spinner').style.display = 'block';

        // Simulate loading delay
        setTimeout(() => {
            loadMorePosts();
            loadMoreBtn.querySelector('span').style.opacity = '1';
            loadMoreBtn.querySelector('.fa-spinner').style.display = 'none';
        }, 1000);
    });

    function loadMorePosts() {
        const gridLayout = document.querySelector('.grid-layout');
        const posts = [
            {
                image: 'blog-5.jpg',
                category: 'tech',
                title: 'Blockchain và tương lai của tài chính',
                excerpt: 'Khám phá cách blockchain đang thay đổi ngành tài chính...',
                author: 'Mike Johnson',
                date: 'Mar 28, 2025'
            },
            {
                image: 'blog-6.jpg',
                category: 'entertainment',
                title: 'Top 5 series phim đáng xem',
                excerpt: 'Những series phim hay nhất trên các nền tảng streaming...',
                author: 'Sarah Lee',
                date: 'Mar 27, 2025'
            },
            {
                image: 'blog-7.jpg',
                category: 'social',
                title: 'Instagram vs TikTok',
                excerpt: 'So sánh hai nền tảng mạng xã hội phổ biến nhất...',
                author: 'David Kim',
                date: 'Mar 26, 2025'
            }
        ];

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-card hover-lift fade-in-up';
            article.dataset.category = post.category;
            article.innerHTML = `
                <div class="card-image image-hover">
                    <img src="images/${post.image}" alt="${post.title}">
                    <div class="post-category">${post.category}</div>
                </div>
                <div class="card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="card-meta">
                        <div class="author">
                            <img src="images/author-${Math.floor(Math.random() * 5) + 1}.jpg" alt="Author">
                            <span>${post.author}</span>
                        </div>
                        <div class="post-date">
                            <i class="far fa-calendar"></i>
                            <span>${post.date}</span>
                        </div>
                    </div>
                    <a href="#" class="read-more">Đọc tiếp <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            gridLayout.appendChild(article);
        });

        currentPage++;
        if (currentPage >= 3) {
            loadMoreBtn.style.display = 'none';
        }
    }

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

    // Scroll to Top
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('fade-in');
        } else {
            scrollTopBtn.classList.remove('fade-in');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Share Buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.classList[1];
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            switch(type) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.hero-search input');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.blog-card');
            
            posts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                    post.classList.add('fade-in-up');
                } else {
                    post.style.display = 'none';
                }
            });
        }, 300);
    });

    // Add Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
});
