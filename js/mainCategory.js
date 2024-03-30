document.addEventListener("DOMContentLoaded", function () {
    // Backend'den kategorileri almak için fetch işlemi
    fetch('http://localhost:8080/category/getAll')
        .then(response => response.json())
        .then(data => {
            // Gelen kategorileri işle
            var categoryContainer = document.querySelector(".row.py-5"); // Kategori container'ı seç

            function addCategory(category) {
                // Kategori kartını oluştur
                var categoryCard = document.createElement("div");
                categoryCard.classList.add("col-md-4", "text-center");

                // Kart içeriği
                var cardInnerHtml = `
    <div class="card mb-4 product-wap rounded-0">
        <div class="card rounded-0">
            <img class="card-img rounded-0 img-fluid" src="data:image/jpeg;base64,${category.categoryImage}" style="padding: 50px;">
            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
            </div>
        </div>
        <div class="card-body py-3">
            <a href="product-subCategory.html?categoryId=${category.id}" class="h3 text-decoration-none">${category.categoryName}</a>
            <h1 class="h3 py-1 w-100 list-unstyled justify-content-between mb-0" style="color: red;">
                <h1 class="h3 py-1 w-100 list-unstyled justify-content-between mb-0" style="color: red;">
                                <a href="product-subCategory.html?categoryId=${category.id}" class="button-product h3" style="color: red;">DETAYLI BİLGİ</a>
                            </h1>
            </h1>
        </div>
    </div>`;

                categoryCard.innerHTML = cardInnerHtml; // Kartın içeriğini ekle
                categoryContainer.appendChild(categoryCard); // Kategori container'a kartı ekle
            }

            // Kullanımı
            data.forEach(addCategory);
        })
        .catch(error => console.error('Hata:', error));
});

