

// Bắt tất cả các liên kết trong menu điều hướng
document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', function (e) {
        // Lấy giá trị href của liên kết
        const targetId = this.getAttribute('href');
        
        // Nếu href bắt đầu bằng # (link nội bộ)
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Ngăn hành vi mặc định của trình duyệt

            // Tìm phần tử mục tiêu
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cuộn mượt tới phần tử mục tiêu
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Hiệu ứng trượt mượt
                    block: 'start' // Cuộn đến đầu phần tử
                });
            }
        }
    });
});

// =====================================================================================================================================================================================


// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Isotope
    var grid = document.querySelector('.grid');
    var iso = new Isotope(grid, {
      itemSelector: '.col-lg-4',
      percentPosition: true,
      masonry: {
        columnWidth: '.col-lg-4'
      }
    });
  
    // Filter items on button click
    var filterButtons = document.querySelector('.filters-button-group');
    filterButtons.addEventListener('click', function(event) {
      if (!event.target.matches('button')) return;
      
      var filterValue = event.target.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
  
      // Update active button state
      filterButtons.querySelector('.is-checked').classList.remove('is-checked');
      event.target.classList.add('is-checked');
    });
  });

// =====================================================================================================================
// Skill
  function openTab(evt, tabName) {
    // Lấy tất cả tab content và loại bỏ class active
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.opacity = 0; // Đặt opacity về 0 trước khi ẩn
    });
  
    // Xóa class active khỏi tất cả các nút
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
  
    // Hiển thị tab được chọn
    const currentTab = document.getElementById(tabName);
    currentTab.classList.add('active');
  
    // Thêm hiệu ứng fade-in
    setTimeout(() => {
      currentTab.style.opacity = 1;
    }, 50); // Delay nhỏ để đảm bảo transition hoạt động
  
    // Thêm class active cho nút được chọn
    evt.currentTarget.classList.add('active');
  }
  