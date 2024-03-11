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