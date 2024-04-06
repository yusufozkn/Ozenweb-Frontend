document.addEventListener("DOMContentLoaded", function () {
    // Kullanıcının token bilgisini al
    const token = localStorage.getItem("token");

    // Admin sayfalarının URL'lerini tanımla
    const adminPages = ["/admin-mainCategory.html", "/admin-subCategory.html", "/admin-feature.html", "/admin-product.html","/admin-singleProduct.html","/admin-singleProductFeatureAdd.html"];

    // Kullanıcının token bilgisinin olup olmadığını ve admin sayfalarına erişmeye çalışıp çalışmadığını kontrol et
    if (!token && adminPages.includes(window.location.pathname)) {
        // Kullanıcı giriş yapmadıysa ve admin sayfasına erişmeye çalışıyorsa, giriş sayfasına yönlendir
        console.warn("Giriş yapmadan admin sayfalarını görüntüleyemezsiniz.");
        window.location.href = "/login.html";
    }

    // Hata durumunda kullanıcıya bilgilendirme yap
    window.addEventListener('error', function (event) {
        console.error('Bir hata oluştu:', event.message);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    });
});



document.addEventListener("DOMContentLoaded", function () {

    // URL'den ürün ID'sini al
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get("id");
    console.log(productId)

    fetch('http://localhost:8080/product/getWithProductCode?productId=' + productId)
        .then(response => response.json())
        .then(productData => {
            console.log(productData)

            var tableBody = document.getElementById("productTableBody");
            tableBody.innerHTML = ""; // Tabloyu temizle

            var productName = productData.productName; // Ürün adı

            // Ürün adını güncelle
            var productNameHeader = document.getElementById("productNameHeader");
            productNameHeader.textContent = productName;

            // İlk satırı oluştur
            var firstRow = `
        <tr>
            <td rowspan="${productData.productCodes.length}">
                <div class="product-info">
                    <img src="data:image/jpeg;base64,${productData.productMainImage}" alt="${productName}" class="product-image">
                </div>
            </td>
            <td>${productData.productCodes[0].productCodeName}</td>
            <td><a href="admin-singleProductFeatureAdd.html?productCodeId=${productData.productCodes[0].productCodeId}" class="button">Görüntüle</a></td>
            <td><button class="btn btn1 btn-danger" data-product-id="${productData.productCodes[0].productCodeId}">Sil</button></td>
        </tr>
    `;

            // İlk satırı tabloya ekle
            tableBody.innerHTML += firstRow;

            // Diğer ürün kodlarını tabloya ekle
            for (var i = 1; i < productData.productCodes.length; i++) {
                var productCode = productData.productCodes[i];
                var row = `
            <tr>
                <td>${productCode.productCodeName}</td>
                <td><a href="admin-singleProductFeatureAdd.html?productCodeId=${productCode.productCodeId}" class="button">Görüntüle</a></td>
                <td><button class="btn btn1 btn-danger" data-product-id="${productCode.productCodeId}">Sil</button></td>
            </tr>
        `;

                // Satırı tabloya ekle
                tableBody.innerHTML += row;
            }

            // Sil butonlarına tıklama olayını ekle
            var deleteButtons = document.querySelectorAll(".btn1");
            deleteButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    var productIdToDelete = this.getAttribute("data-product-id");
                    showConfirmationKod(productIdToDelete);
                });
            });

        })
        .catch(error => console.error('Hata:', error)); // Fetch hatasını yakala

    // Silme onayı gösterme fonksiyonu
    function showConfirmationKod(productId) {
        var confirmation = confirm("Ürünü Silmek istiyor musunuz?");
        if (confirmation) {
            deleteProductCode(productId);
        }
    }

    // Silme işlemini gerçekleştiren fonksiyon
    function deleteProductCode(productCodeId) {
        fetch('http://localhost:8080/product-code/delete?productCodeId=' + productCodeId, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log("Ürün başarıyla silindi.");
                    // Silinen ürünü tablodan kaldır
                    // Örnek olarak sayfayı yenileme işlemi yapılabilir
                    window.location.reload();
                } else {
                    console.error("Ürün silinirken bir hata oluştu.");
                }
            })
            .catch(error => console.error('Hata:', error));
    }


    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");
    var addButton = document.querySelector(".gg-add-r");
    var openPopupBtn = document.getElementById("openPopupBtn");
    var productCodeInput = document.getElementById("productCodeInput");
    var saveButton = document.getElementById("saveButton");

    // İlk popup'u açan butonun click olayı
    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    // İkinci popup'u açan butonun click olayı
    openPopupBtn.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    // Popup dışındaki alanlara tıklama olayı
    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    // Kaydet butonunun click olayı
    saveButton.addEventListener("click", function () {
        var productId = getProductIdFromURL(); // URL'den ürün ID'sini al
        var productCode = productCodeInput.value; // Kullanıcının girdiği ürün kodunu al

        // POST isteği için ürün kodu verilerini oluştur
        var productCodeData = {
            productId: productId,
            productCode: productCode
        };

        // Backend'e POST isteği gönderme
        fetch('http://localhost:8080/product-code/create?productId=' + productCodeData.productId + '&productCode=' + productCodeData.productCode, {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    console.log("Başarılı: Ürün kodu eklendi.");
                    // Başka işlemler yapılabilir, örneğin popup'ı kapatma
                    popupOverlay.classList.remove("show");
                    popup.classList.remove("show");

                    // Sayfayı yenile
                    window.location.reload();
                    location.reload();
                } else {
                    console.error("Hata: Ürün kodu eklenirken bir sorun oluştu.");
                }
            })
            .catch((error) => {
                console.error('Hata:', error);
                // Hata durumunda kullanıcıya bilgilendirme yapılabilir
            });

    });

    // URL'den ürün ID'sini alma işlevi
    function getProductIdFromURL() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }








    // Silme butonunu seçme
    var deleteProductBtn = document.getElementById("deleteProductBtn");

    // Silme butonuna tıklanınca silme işlemini gerçekleştirme
    deleteProductBtn.addEventListener("click", function () {
        var productId = getProductIdFromURL(); // URL'den ürün ID'sini al
        showConfirmation(productId);
    });

    // Sil butonlarına tıklama olayını ekle
    var deleteButtons = document.querySelectorAll(".btn2");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var productIdToDelete = this.getAttribute("data-product-id");
            showConfirmation(productIdToDelete);
        });
    });

    // Silme onayı gösterme fonksiyonu
    function showConfirmation(productId) {
        var confirmation = confirm("Silmek istiyor musunuz?");
        if (confirmation) {
            deleteProduct(productId);
        }
    }

    // Ürünü silme fonksiyonu
    function deleteProduct(productId) {
        fetch('http://localhost:8080/product/delete?id=' + productId, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log("Ürün başarıyla silindi.");
                    // Başarılı bir şekilde silindiğinde admin-product.html sayfasına yönlendir
                    window.location.href = '/admin-product.html'; // Yönlendirme işlemi
                } else {
                    console.error("Ürün silinirken bir hata oluştu.");
                }
            })
            .catch(error => console.error('Hata:', error));
    }


    // URL'den ürün ID'sini alma işlevi
    function getProductIdFromURL() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

});




