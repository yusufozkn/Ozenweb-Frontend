document.addEventListener("DOMContentLoaded", function () {
    // Backend'den ürün isimlerini almak için fetch işlemi
    fetch('http://localhost:8080/category/getAll')
        .then(response => response.json())
        .then(data => {
            var productContainer = document.getElementById('productList'); // Ürün listesini içeren elementi seç

            data.forEach(product => {
                var listItem = document.createElement('li'); // Yeni bir liste öğesi oluştur
                var link = document.createElement('a'); // Yeni bir bağlantı oluştur
                link.textContent = product.categoryName; // Bağlantının metnini ürün adıyla doldur
                link.href = 'product-subCategory.html?categoryId=' + product.id; // Yönlendirme için href belirt
                link.classList.add('text-decoration-none'); // Bağlantıya stil sınıfı ekle
                listItem.appendChild(link); // Bağlantıyı liste öğesine ekle
                productContainer.appendChild(listItem); // Liste öğesini ürün listesi container'ına ekle
            });
        })
        .catch(error => console.error('Hata:', error));
});
