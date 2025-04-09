document.addEventListener('DOMContentLoaded', () => {
    // Sample featured content data
    const featuredContent = [
        {
            title: 'Top 10 phim Netflix 2025',
            image: 'images/netflix-shows.jpg',
            description: 'Những series đình đám nhất trên Netflix năm 2025'
        },
        {
            title: 'Album của năm',
            image: 'images/music-albums.jpg',
            description: 'Những album được đánh giá cao nhất năm 2025'
        },
        {
            title: 'Game of the Year 2025',
            image: 'images/goty.jpg',
            description: 'Những ứng cử viên sáng giá cho danh hiệu Game of the Year'
        }
        // Add more featured items
    ];

    // Sample reviews data
    const reviews = [
        {
            title: 'Review: The Matrix Revolution',
            rating: 4.5,
            author: 'Nguyễn Văn A',
            date: '2025-03-29',
            image: 'images/matrix-review.jpg',
            excerpt: 'Một tác phẩm đột phá về công nghệ và kỹ xảo điện ảnh...'
        },
        {
            title: 'Album Review: Next Level',
            rating: 4.0,
            author: 'Trần Thị B',
            date: '2025-03-28',
            image: 'images/album-review.jpg',
            excerpt: 'Sự kết hợp hoàn hảo giữa âm nhạc hiện đại và truyền thống...'
        }
        // Add more reviews
    ];

    // Initialize content slider
    let currentSlide = 0;
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    function updateSlider() {
        sliderContainer.innerHTML = '';
        featuredContent.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `slider-item ${index === currentSlide ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="slider-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            sliderContainer.appendChild(slide);
        });
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + featuredContent.length) % featuredContent.length;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % featuredContent.length;
        updateSlider();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % featuredContent.length;
        updateSlider();
    }, 5000);

    // Initialize reviews
    const reviewsGrid = document.querySelector('.reviews-grid');
    let displayedReviews = 6;

    function displayReviews() {
        reviewsGrid.innerHTML = '';
        reviews.slice(0, displayedReviews).forEach(review => {
            const reviewElement = document.createElement('article');
            reviewElement.className = 'review-card';
            reviewElement.innerHTML = `
                <img src="${review.image}" alt="${review.title}">
                <div class="review-content">
                    <h3>${review.title}</h3>
                    <div class="rating">
                        ${generateStars(review.rating)}
                    </div>
                    <p>${review.excerpt}</p>
                    <div class="review-meta">
                        <span class="author">${review.author}</span>
                        <span class="date">${formatDate(review.date)}</span>
                    </div>
                </div>
            `;
            reviewsGrid.appendChild(reviewElement);
        });
    }

    // Load more reviews
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.addEventListener('click', () => {
        displayedReviews += 3;
        displayReviews();
        if (displayedReviews >= reviews.length) {
            loadMoreButton.style.display = 'none';
        }
    });

    // Helper functions
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    }

    // Add smooth scrolling for category links
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .review-card').forEach(el => {
        observer.observe(el);
    });

    // Initial display
    updateSlider();
    displayReviews();
});
