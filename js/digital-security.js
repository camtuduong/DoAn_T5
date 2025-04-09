document.addEventListener('DOMContentLoaded', () => {
    // Password Strength Checker
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.meter-bar');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }

    function checkPasswordStrength(e) {
        const password = e.target.value;
        let strength = 0;
        let status = '';

        if (password.length >= 8) strength += 20;
        if (password.match(/[a-z]+/)) strength += 20;
        if (password.match(/[A-Z]+/)) strength += 20;
        if (password.match(/[0-9]+/)) strength += 20;
        if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 20;

        strengthMeter.style.width = strength + '%';

        if (strength <= 20) {
            strengthMeter.style.background = '#ff4757';
            status = 'Rất yếu';
        } else if (strength <= 40) {
            strengthMeter.style.background = '#ffa502';
            status = 'Yếu';
        } else if (strength <= 60) {
            strengthMeter.style.background = '#ffdd59';
            status = 'Trung bình';
        } else if (strength <= 80) {
            strengthMeter.style.background = '#2ed573';
            status = 'Mạnh';
        } else {
            strengthMeter.style.background = '#1e90ff';
            status = 'Rất mạnh';
        }

        strengthText.textContent = `Độ mạnh mật khẩu: ${status}`;
    }

    // Security Checker Form
    const securityCheckerForm = document.getElementById('securityCheckerForm');
    if (securityCheckerForm) {
        securityCheckerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simulate security check
            checkSecurity(email, password);
        });
    }

    function checkSecurity(email, password) {
        // Simulated security checks
        const checks = {
            email: {
                leaked: Math.random() > 0.7,
                vulnerable: Math.random() > 0.8,
                recommendations: []
            },
            password: {
                common: Math.random() > 0.7,
                reused: Math.random() > 0.8,
                recommendations: []
            }
        };

        // Generate recommendations
        if (checks.email.leaked) {
            checks.email.recommendations.push('Email của bạn đã bị lộ trong một vụ rò rỉ dữ liệu. Hãy thay đổi mật khẩu ngay.');
        }
        if (checks.email.vulnerable) {
            checks.email.recommendations.push('Email của bạn có thể dễ bị tấn công. Hãy bật xác thực 2 lớp.');
        }
        if (checks.password.common) {
            checks.password.recommendations.push('Mật khẩu của bạn quá phổ biến. Hãy chọn mật khẩu phức tạp hơn.');
        }
        if (checks.password.reused) {
            checks.password.recommendations.push('Mật khẩu này đã được sử dụng ở nơi khác. Nên dùng mật khẩu riêng cho mỗi tài khoản.');
        }

        showSecurityResults(checks);
    }

    function showSecurityResults(checks) {
        const modal = document.createElement('div');
        modal.className = 'security-modal glass-effect';
        
        let recommendations = [...checks.email.recommendations, ...checks.password.recommendations];
        if (recommendations.length === 0) {
            recommendations = ['Tài khoản của bạn hiện đang an toàn!'];
        }

        modal.innerHTML = `
            <div class="modal-content">
                <h3>Kết quả kiểm tra bảo mật</h3>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li><i class="fas ${rec.includes('an toàn') ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>${rec}</li>`).join('')}
                </ul>
                <button class="modern-button ripple-button" onclick="this.parentElement.parentElement.remove()">
                    Đóng
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter() {
        counters.forEach(counter => {
            const target = counter.textContent;
            const count = +counter.getAttribute('data-count') || 0;
            const increment = parseInt(target) / speed;

            if (count < parseInt(target)) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                counter.textContent = Math.ceil(count + increment) + '%';
                setTimeout(animateCounter, 1);
            } else {
                counter.textContent = target;
            }
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    animateCounter();
                }
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.fade-in-up, .fade-in, .counter').forEach(el => {
        observer.observe(el);
    });

    // Ripple Effect
    document.querySelectorAll('.ripple-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});
