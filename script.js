// JavaScript for interactive features
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 滚动时添加动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .capability, .pipeline-stage, .showcase-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 模拟性能指标的动态更新
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach((metric, index) => {
        const targetValue = parseFloat(metric.textContent);
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const updateMetric = () => {
            currentValue += increment;
            if (currentValue < targetValue) {
                metric.textContent = currentValue.toFixed(1);
                requestAnimationFrame(updateMetric);
            } else {
                metric.textContent = targetValue.toFixed(1);
            }
        };
        
        // 延迟开始动画
        setTimeout(() => {
            updateMetric();
        }, index * 200);
    });

    // 进度条动画
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // 工具提示功能
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('tooltip-active');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('tooltip-active');
        });
    });

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 复制代码功能
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #FF8C00;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const text = block.textContent.replace('Copy', '').trim();
            navigator.clipboard.writeText(text).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // 响应式导航菜单
    function createMobileMenu() {
        const header = document.querySelector('header');
        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <button class="menu-toggle">☰</button>
            <ul class="nav-links">
                <li><a href="#architecture">Architecture</a></li>
                
                <li><a href="#training">Training</a></li>
                <li><a href="#understanding">Understanding</a></li>
                <li><a href="#generation">Generation</a></li>
                <li><a href="#editing">Editing</a></li>
                <li><a href="#efficiency">Efficiency</a></li>
                
            </ul>
        `;
        
        header.appendChild(nav);
        
        const menuToggle = nav.querySelector('.menu-toggle');
        const navLinks = nav.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 检查是否为移动设备
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // 性能监控
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
            });
        }
    }

    trackPerformance();

    // 已移除：深色模式切换按钮（包括创建与事件绑定）
});

// 添加一些实用函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(function() {
    // 重新计算布局相关的内容
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
}, 250));
