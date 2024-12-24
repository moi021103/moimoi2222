// Chọn tất cả các mục menu
const menuItems = document.querySelectorAll('.dropdown-item');

// Lắng nghe sự kiện click cho từng mục
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Xóa lớp 'active' khỏi tất cả các mục
    menuItems.forEach((i) => i.classList.remove('active'));
    // Thêm lớp 'active' vào mục được nhấp
    item.classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
    let progressAnimated = false;
    let countersAnimated = false;

    // Function to animate progress bars
    function animateProgressBar() {
        const skillItems = document.querySelectorAll(".skill_item");
        skillItems.forEach((item) => {
            const progressBar = item.querySelector(".progress-bar");
            const targetValue = parseInt(progressBar.getAttribute("aria-valuenow"), 10);
            const percentageText = item.querySelector("h4 span");

            let currentValue = 0;
            progressBar.style.width = `${targetValue}%`;

            const interval = setInterval(() => {
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                } else {
                    currentValue++;
                    percentageText.textContent = `${currentValue}%`;
                }
            }, 15);
        });
    }

    // Function to animate counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.innerText; // Target value
            counter.innerText = '0'; // Initialize as 0
            const increment = target / 100; // Speed of increment

            const updateCounter = () => {
                const value = +counter.innerText;
                if (value < target) {
                    counter.innerText = Math.ceil(value + increment); // Increment
                    setTimeout(updateCounter, 20); // Repeat
                } else {
                    counter.innerText = target; // Ensure final value is accurate
                }
            };
            updateCounter();
        });
    }

    // Function to check if an element is in viewport (fallback)
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // IntersectionObserver for progress bar
    const toolsExpert = document.querySelector(".tool_expert");
    if ("IntersectionObserver" in window) {
        const observerProgress = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !progressAnimated) {
                        animateProgressBar();
                        progressAnimated = true;
                        observerProgress.disconnect(); // Stop observing after animation
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        observerProgress.observe(toolsExpert);
    } else {
        // Fallback for progress bar
        const onScrollProgress = () => {
            if (!progressAnimated && isElementInViewport(toolsExpert)) {
                animateProgressBar();
                progressAnimated = true;
                window.removeEventListener("scroll", onScrollProgress);
            }
        };

        window.addEventListener("scroll", onScrollProgress);

        // Check immediately on page load
        if (isElementInViewport(toolsExpert)) {
            animateProgressBar();
            progressAnimated = true;
            window.removeEventListener("scroll", onScrollProgress);
        }
    }

    // IntersectionObserver for counters in #project
    const projectSection = document.querySelector("#num-project");
    if ("IntersectionObserver" in window) {
        const observerCounters = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !countersAnimated) {
                        animateCounters();
                        countersAnimated = true;
                        observerCounters.disconnect(); // Stop observing after animation
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        observerCounters.observe(projectSection);
    } else {
        // Fallback for counters
        const onScrollCounters = () => {
            if (!countersAnimated && isElementInViewport(projectSection)) {
                animateCounters();
                countersAnimated = true;
                window.removeEventListener("scroll", onScrollCounters);
            }
        };

        window.addEventListener("scroll", onScrollCounters);

        // Check immediately on page load
        if (isElementInViewport(projectSection)) {
            animateCounters();
            countersAnimated = true;
            window.removeEventListener("scroll", onScrollCounters);
        }
    }
});

// Slide image
const CarouselModule = (function () {
    const initCarousel = function () {
        const carouselImages = document.querySelector('.carousel-images');
        const images = document.querySelectorAll('.carousel-images img');
        const dots = document.querySelectorAll('.dots li');
        const next = document.getElementById('next');
        const prev = document.getElementById('prev');
        const totalImages = images.length;
        let currentIndex = 0;

        // Cập nhật trạng thái slide
        const updateCarousel = () => {
            // Cập nhật vị trí hình ảnh
            const offset = -currentIndex * 100;
            carouselImages.style.transform = `translateX(${offset}%)`;

            // Cập nhật trạng thái dots
            document.querySelector('.dots li.active').classList.remove('active');
            dots[currentIndex].classList.add('active');

            // Cập nhật trạng thái hiển thị của ảnh
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
        };

        // Chuyển đến hình ảnh kế tiếp
        const goToNext = () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
            resetAutoSlide();
        };

        // Quay lại hình ảnh trước đó
        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
            resetAutoSlide();
        };

        // Chuyển đến hình ảnh theo dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoSlide();
            });
        });

        // Tự động chuyển slide
        let autoSlide = setInterval(goToNext, 3000);

        // Reset tự động chuyển slide sau mỗi thao tác
        const resetAutoSlide = () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(goToNext, 3000);
        };

        // Gắn sự kiện cho các nút điều khiển
        next.addEventListener('click', goToNext);
        prev.addEventListener('click', goToPrev);

        // Gọi cập nhật ban đầu để thiết lập trạng thái đầu tiên
        updateCarousel();
    };

    return {
        init: initCarousel,
    };
})();

// Khởi động carousel khi DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    CarouselModule.init();
});

// =============================================================================================================================================

// Lấy nút cuộn lên đầu trang
let scrollTopBtn = document.getElementById("scrollTopBtn");

// Khi cuộn trang, kiểm tra vị trí và hiển thị/ẩn nút
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
};

// Khi nhấn nút, cuộn lên đầu trang
scrollTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ============================================================================================================================================

