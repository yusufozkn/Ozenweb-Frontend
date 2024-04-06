document.addEventListener("DOMContentLoaded", function () {
    // URL'den categoryId parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    // Backend'den alt kategorileri almak için fetch işlemi
    fetch('http://localhost:8080/sub-category/getByCategory?categoryId=' + categoryId)
        .then(response => response.json())
        .then(data => {
            // Gelen alt kategorileri işle
            var subCategoryList = document.getElementById("subCategoryList");

            if (data.length === 0) {
                var message = document.createElement("div");
                message.textContent = "Bu kategoride ürün bulunamadı";
                message.classList.add("text-center","h2");
                subCategoryList.appendChild(message);
            } else {
                function addSubCategory(subCategory) {
                    var subCategoryItem = document.createElement("div");
                    subCategoryItem.classList.add("col-md-4", "text-center");

                    // Alt kategori kartı içeriği
                    var subCategoryInnerHtml = `
                        <div class="card mb-4 product-wap rounded-0">
                            <div class="card rounded-0">
                                <img class="card-img rounded-0 img-fluid" src="data:image/jpeg;base64,${subCategory.subCategoryImage}" alt="${subCategory.subCategoryName}"style="padding: 50px;">
                                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                </div>
                            </div>
                            <div class="card-body py-3">
                                <a href="#" class="h3 text-decoration-none">${subCategory.subCategoryName}</a>
                                <h1 class="h3 py-1 w-100 list-unstyled justify-content-between mb-0" style="color: red;">
                                    <a href="product-products.html?subCategoryId=${subCategory.id}" class="button-product h3" style="color: red;">DETAYLI BİLGİ</a>
                                </h1>
                            </div>
                        </div>`;

                    subCategoryItem.innerHTML = subCategoryInnerHtml;
                    subCategoryList.appendChild(subCategoryItem);
                }

                // Kullanımı
                data.forEach(addSubCategory);
            }
        })
        .catch(error => console.error('Hata:', error));
});
