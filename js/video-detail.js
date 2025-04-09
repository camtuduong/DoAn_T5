document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    });

    // Video Player Controls
    const video = document.getElementById('mainVideo');
    let isPlaying = false;

    video.addEventListener('click', () => {
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        isPlaying = !isPlaying;
    });

    // Like/Dislike Functionality
    const likeBtn = document.querySelector('.like-btn');
    const dislikeBtn = document.querySelector('.dislike-btn');
    let isLiked = false;
    let isDisliked = false;

    likeBtn.addEventListener('click', () => {
        if (!isLiked) {
            likeBtn.classList.add('active');
            if (isDisliked) {
                dislikeBtn.classList.remove('active');
                isDisliked = false;
            }
            const likeCount = likeBtn.querySelector('span');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
            likeBtn.classList.remove('active');
            const likeCount = likeBtn.querySelector('span');
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        }
        isLiked = !isLiked;
    });

    dislikeBtn.addEventListener('click', () => {
        if (!isDisliked) {
            dislikeBtn.classList.add('active');
            if (isLiked) {
                likeBtn.classList.remove('active');
                isLiked = false;
            }
        } else {
            dislikeBtn.classList.remove('active');
        }
        isDisliked = !isDisliked;
    });

    // Share Modal
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.querySelector('.close-modal');

    shareBtn.addEventListener('click', () => {
        shareModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        shareModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Copy Link Functionality
    const copyBtn = document.querySelector('.copy-btn');
    const linkInput = document.querySelector('.share-link input');

    copyBtn.addEventListener('click', () => {
        linkInput.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });

    // Subscribe Button Animation
    const subscribeBtn = document.querySelector('.subscribe-btn');
    let isSubscribed = false;

    subscribeBtn.addEventListener('click', () => {
        if (!isSubscribed) {
            subscribeBtn.innerHTML = '<i class="fas fa-bell"></i> Đã đăng ký';
            subscribeBtn.classList.add('subscribed');
            // Add notification animation
            const notification = document.createElement('div');
            notification.className = 'notification fade-in-up';
            notification.textContent = 'Đã đăng ký kênh!';
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 3000);
        } else {
            subscribeBtn.innerHTML = '<i class="fas fa-bell"></i> Đăng ký';
            subscribeBtn.classList.remove('subscribed');
        }
        isSubscribed = !isSubscribed;
    });

    // Comment Form
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        if (textarea.value.trim()) {
            const newComment = document.createElement('div');
            newComment.className = 'comment-item hover-lift fade-in-up';
            newComment.innerHTML = `
                <img src="images/user-avatar.jpg" alt="Your Avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>Bạn</h4>
                        <span>Vừa xong</span>
                    </div>
                    <p>${textarea.value}</p>
                    <div class="comment-actions">
                        <button><i class="fas fa-thumbs-up"></i> 0</button>
                        <button><i class="fas fa-thumbs-down"></i></button>
                        <button>Phản hồi</button>
                    </div>
                </div>
            `;
            commentsList.insertBefore(newComment, commentsList.firstChild);
            textarea.value = '';
        }
    });

    // Load More Comments
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let commentPage = 1;

    loadMoreBtn.addEventListener('click', () => {
        commentPage++;
        // Simulate loading more comments
        loadMoreBtn.innerHTML = '<div class="loading-spinner"></div>';
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                const newComment = document.createElement('div');
                newComment.className = 'comment-item hover-lift fade-in-up';
                newComment.innerHTML = `
                    <img src="images/commenter-${commentPage + i}.jpg" alt="Commenter">
                    <div class="comment-content">
                        <div class="comment-header">
                            <h4>Người dùng ${commentPage * 3 + i}</h4>
                            <span>${i + 1} ngày trước</span>
                        </div>
                        <p>Nội dung bình luận mẫu ${commentPage * 3 + i}</p>
                        <div class="comment-actions">
                            <button><i class="fas fa-thumbs-up"></i> ${Math.floor(Math.random() * 100)}</button>
                            <button><i class="fas fa-thumbs-down"></i></button>
                            <button>Phản hồi</button>
                        </div>
                    </div>
                `;
                commentsList.appendChild(newComment);
            }
            loadMoreBtn.textContent = 'Xem thêm bình luận';
        }, 1000);
    });

    // Lazy Loading for Related Videos
    const loadRelatedVideos = () => {
        const relatedVideos = document.querySelector('.related-videos');
        for (let i = 2; i <= 5; i++) {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card hover-lift';
            videoCard.innerHTML = `
                <div class="thumbnail image-hover">
                    <img src="images/related-${i}.jpg" alt="Related Video ${i}">
                    <span class="duration">${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60)}</span>
                </div>
                <div class="video-info">
                    <h4>Video liên quan ${i}</h4>
                    <p>Tech Review Channel</p>
                    <div class="meta">
                        <span>${Math.floor(Math.random() * 100)}K lượt xem</span>
                        <span>${i} tuần trước</span>
                    </div>
                </div>
            `;
            relatedVideos.appendChild(videoCard);
        }
    };

    // Load related videos when page loads
    loadRelatedVideos();
});
