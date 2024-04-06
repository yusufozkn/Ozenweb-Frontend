document.addEventListener("DOMContentLoaded", function () {
    // URL'den subCategoryId parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const subCategoryId = urlParams.get('subCategoryId');
    console.log(subCategoryId)

    // Backend'den ürünleri almak için fetch işlemi
    fetch('http://localhost:8080/product/getBySubCategory?subCategoryId=' + subCategoryId)
        .then(response => response.json())
        .then(data => {
            // Gelen ürünleri işle
            var productList = document.getElementById("productContainer");

            if (data.length === 0) {
                var message = document.createElement("div");
                message.textContent = "Bu alt kategoride ürün bulunamadı.";
                message.classList.add("text-center","h2");
                productList.appendChild(message);
            } else {
                function addProduct(product) {
                    var productItem = document.createElement("div");
                    productItem.classList.add("col-md-4", "text-center");

                    // Ürün kartı içeriği
                    var productInnerHtml = `
                        <div class="card mb-4 product-wap rounded-0">
                            <div class="card rounded-0">
                                <img class="card-img rounded-0 img-fluid" src="data:image/jpeg;base64,${product.productMainImage}" alt="${product.productName}" style="padding: 50px;">
                                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                </div>
                            </div>
                            <div class="card-body py-3">
                                <a href="#" class="h3 text-decoration-none">${product.productName}</a>
                                <h1 class="h3 py-3 w-100 list-unstyled justify-content-between mb-0" style="color: red;">
                                    <a href="product-single.html?productId=${product.id}" class="button-product h3" style="color: red;">DETAYLI BİLGİ</a>
                                </h1>
                            </div>
                        </div>`;

                    productItem.innerHTML = productInnerHtml;
                    productList.appendChild(productItem);
                }

                // Kullanımı
                data.forEach(addProduct);
            }
        })
        .catch(error => console.error('Hata:', error));
});
