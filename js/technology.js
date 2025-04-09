document.addEventListener('DOMContentLoaded', () => {
    // Load trending tech dynamically
    loadTrendingTech();
    loadTechNews();
    loadTechReviews();
    loadTechEvents();

    function loadTrendingTech() {
        const trendingList = document.getElementById('trendingList');
        const trends = [
            { title: 'AI trong Marketing', link: '#' },
            { title: 'Blockchain và DeFi', link: '#' },
            { title: 'Metaverse và tương lai số', link: '#' }
        ];
        trends.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
            trendingList.appendChild(li);
        });
    }

    function loadTechNews() {
        const newsFeed = document.getElementById('newsFeed');
        const news = [
            { title: 'Công nghệ 5G và ảnh hưởng', img: 'images/5g.jpg', link: '#' },
            { title: 'Sự phát triển của thực tế ảo', img: 'images/vr.jpg', link: '#' }
        ];
        news.forEach(item => {
            const newsItem = `
                <article class="news-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="news-content">
                        <h3>${item.title}</h3>
                        <a href="${item.link}" class="read-more">Xem thêm</a>
                    </div>
                </article>
            `;
            newsFeed.innerHTML += newsItem;
        });
    }

    function loadTechReviews() {
        const reviewsSlider = document.getElementById('reviewsSlider');
        const reviews = [
            { title: 'Đánh giá iPhone 15 Pro', img: 'images/iphone.jpg', link: '#' },
            { title: 'Đánh giá Galaxy S24 Ultra', img: 'images/galaxy.jpg', link: '#' }
        ];
        reviews.forEach(item => {
            const reviewItem = `
                <div class="review-item">
                    <img src="${item.img}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <a href="${item.link}" class="read-more">Xem thêm</a>
                </div>
            `;
            reviewsSlider.innerHTML += reviewItem;
        });
    }

    function loadTechEvents() {
        const eventsList = document.getElementById('eventsList');
        const events = [
            { title: 'CES 2025 - Triển lãm công nghệ', date: '10/01/2025' },
            { title: 'Google I/O 2025', date: '15/05/2025' }
        ];
        events.forEach(item => {
            const eventItem = `
                <div class="event-item">
                    <h4>${item.title}</h4>
                    <p>${item.date}</p>
                </div>
            `;
            eventsList.innerHTML += eventItem;
        });
    }
});
