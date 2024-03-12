
//header
document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // Sayfa aşağı kaydırıldığında
            header.classList.add('sticky-header');
        } else { // Sayfa yukarı çıkıldığında
            header.classList.remove('sticky-header');
        }
    });
});

//alt kategoriler
document.addEventListener("DOMContentLoaded", function () {
    var productNavItem = document.querySelector('.nav-item[href="product.html"]');
    var submenu = productNavItem.querySelector('.submenu');

    // Alt menüye girildiğinde alt menüyü göster
    submenu.addEventListener('mouseenter', function () {
        submenu.style.display = 'block';
    });

    // Alt menüden çıkıldığında alt menüyü gizle
    submenu.addEventListener('mouseleave', function () {
        submenu.style.display = 'none';
    });
});
