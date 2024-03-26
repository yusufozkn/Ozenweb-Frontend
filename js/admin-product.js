document.addEventListener("DOMContentLoaded", function () {
    var productListContainer = document.getElementById("productListContainer");

    // Backendden ürünleri GET isteğiyle al
    fetch('http://localhost:8080/product/getAll')
        .then(response => response.json())
        .then(products => {
            // Her bir ürün için işlem yap
            for (var i = 0; i < products.length; i += 3) {
                var row = document.createElement("div");
                row.classList.add("row", "py-3", "text-center");

                // Her satırda üç ürün gösterilecek
                for (var j = 0; j < 3; j++) {
                    if (i + j < products.length) {
                        var product = products[i + j];
                        var productColumn = createProductColumn(product);
                        row.appendChild(productColumn);
                    }
                }

                productListContainer.appendChild(row);
            }
        })
        .catch(error => console.error('Hata:', error));

    // Her bir ürün için sütun oluştur
    function createProductColumn(product) {
        var column = document.createElement("div");
        column.classList.add("col-md-4", "main-border");

        // Sütuna özel stil ekle
        column.style.padding = "10px"; // Örnek bir stil, istediğiniz gibi değiştirebilirsiniz
        // Sütuna imleç geldiğinde stil değiştir
        column.addEventListener("mouseenter", function () {
            column.style.backgroundColor = "#f5f5f4";
            column.style.cursor = "pointer"; // İmleci el işareti şekline dönüştür
        });

        // Sütundan imleç çıkınca stilin eski haline dönmesi için
        column.addEventListener("mouseleave", function () {
            column.style.backgroundColor = ""; // Önceki stilinizi buraya ekleyin
            column.style.cursor = ""; // İmleci varsayılan haline döndür
        });

        var productImage = document.createElement("img");
        productImage.classList.add("img-fluid", "product-img");
        productImage.style.height = "180px";
        productImage.style.objectFit = "cover";
        productImage.alt = product.productName;
        productImage.src = "data:image/jpeg;base64," + product.productMainImage;

        var productName = document.createElement("p");
        productName.classList.add("product-name" );
        productName.textContent = product.productName;

        // Ürüne tıklanıldığında yönlendirme yap
        column.addEventListener("click", function () {
            // Tıklandığında yönlendirilecek sayfanın URL'sini buraya yazın
            var redirectUrl = "/admin-singleProduct.html?id=" + product.id; // Ürün ID'sini parametre olarak ekleyin

            // Yönlendirme yap
            window.location.href = redirectUrl;
        });

        column.appendChild(productImage);
        column.appendChild(productName);

        return column;
    }

});

document.addEventListener("DOMContentLoaded", function () {
    var categories = [
        {
            id: 1,
            name: "Elektronik",
            subCategories: [
                { id: 11, name: "Telefonlar" },
                { id: 12, name: "Bilgisayarlar" },
                { id: 13, name: "Tabletler" }
            ]
        },
        {
            id: 2,
            name: "Giyim",
            subCategories: [
                { id: 21, name: "Erkek Giyim" },
                { id: 22, name: "Kadın Giyim" },
                { id: 23, name: "Çocuk Giyim" }
            ]
        },
        {
            id: 3,
            name: "Ev & Yaşam",
            subCategories: [
                { id: 31, name: "Mobilya" },
                { id: 32, name: "Ev Dekorasyonu" },
                { id: 33, name: "Ev Aletleri" }
            ]
        }
    ];

    var mainCategoryDropdown = document.getElementById("mainCategory");
    var subCategoryDropdown = document.getElementById("subCategory");

    // Ana kategori dropdown menüsünü doldur
    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        mainCategoryDropdown.appendChild(option);
    });

    // Üst kategori seçildiğinde alt kategorileri doldur
    mainCategoryDropdown.addEventListener("change", function () {
        var selectedCategoryId = parseInt(this.value);
        var selectedCategory = categories.find(function (category) {
            return category.id === selectedCategoryId;
        });

        // Alt kategori dropdown'ını temizle
        subCategoryDropdown.innerHTML = "";

        selectedCategory.subCategories.forEach(function (subCategory) {
            var option = document.createElement("option");
            option.value = subCategory.id;
            option.textContent = subCategory.name;
            subCategoryDropdown.appendChild(option);
        });
    });

    // Popup açma işlevi
    var addProductButton = document.getElementById("addProductButton");
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");

    addProductButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    // Popup dışına tıklanınca popup penceresi kapatma işlevi
    popupOverlay.addEventListener("click", function (event) {
        if (event.target === this) {
            popupOverlay.classList.remove("show");
            popup.classList.remove("show");
        }
    });

    // Kaydet butonuna tıklanınca verileri al ve popup'ı kapat
    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function () {
        var mainCategory = mainCategoryDropdown.value;
        var subCategory = subCategoryDropdown.value;
        var productName = document.getElementById("productName").value;
        var image = document.getElementById("image").files[0];

        // Resim önizleme alanını göster
        document.getElementById("imageCaption").style.display = "block";

        // Verileri konsola yazdırma
        console.log("Ana Kategori:", mainCategory);
        console.log("Alt Kategori:", subCategory);
        console.log("Ürün İsmi:", productName);
        console.log("Seçilen Resim:", image);

        // Popup'ı kapat
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    // Resim seçme işlevi
    var imageInput = document.getElementById("image");
    var preview = document.getElementById("preview");

    imageInput.addEventListener("change", function (event) {
        var file = event.target.files[0];

        // Resmi önizle
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            preview.innerHTML = "";
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});
