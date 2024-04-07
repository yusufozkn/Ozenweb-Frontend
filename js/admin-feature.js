document.addEventListener("DOMContentLoaded", function () {
    // Kullanıcının token bilgisini al
    const token = localStorage.getItem("token");

    // Admin sayfalarının URL'lerini tanımla
    const adminPages = ["/admin-mainCategory.html", "/admin-subCategory.html", "/admin-feature.html", "/admin-product.html", "/admin-singleProduct.html", "/admin-singleProductFeatureAdd.html"];

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
    var propertiesContainer = document.getElementById("propertiesContainer");
    var addButton = document.querySelector(".gg-add-r");
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");
    var saveButton = document.getElementById("saveButton");

    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    // Özellik eklemek için backend'e POST isteği gönderme işlevi
    saveButton.addEventListener("click", function () {
        var categoryName = document.getElementById("imageCaption").value;

        // Kategori bilgilerini oluştur
        var categoryData = {
            categoryName: categoryName,
            categoryImage: null//---------------------------------------------burda problem
        };

        // Kullanıcının token bilgisini al
        const token = localStorage.getItem("token");

        // Backend'e POST isteği gönderme
        fetch('http://localhost:8080/product-feature-category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(categoryData),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        console.log("Token geçersiz. Yönlendiriliyor...");
                        // Token geçersizse login sayfasına yönlendir
                        localStorage.removeItem("token");
                        window.location.href = "/login.html";
                    } else {
                        throw new Error("HTTP Hatası: " + response.status);
                    }
                }
                if (response.ok) {
                    console.log("Özellik başarıyla eklendi.");
                    window.location.reload(); // Sayfayı yeniden yükle
                } else {
                    console.error("Özellik eklenirken bir hata oluştu.");
                }
            })
            .catch((error) => {
                console.error('Hata:', error);
                // Hata durumunda kullanıcıya bilgilendirme yapılabilir
                window.location.reload();
            });
    });


    // Backend'den kategorileri almak için fetch işlemi
    fetch('http://localhost:8080/product-feature-category/getAll')
        .then(response => response.json())
        .then(data => {
            // Gelen verileri işle
            data.forEach(feature => {
                var propertyRow = document.createElement("div");
                propertyRow.classList.add("row");

                var propertyBox = document.createElement("div");
                propertyBox.classList.add("properties-container", "col-lg-11");

                var propertyNameElement = document.createElement("div");
                propertyNameElement.classList.add("property-box");
                propertyNameElement.textContent = feature.categoryName;

                var trashButtonContainer = document.createElement("div");
                trashButtonContainer.classList.add("col-lg-1");

                var trashButton = document.createElement("button");
                trashButton.classList.add("trash-button", "parent");
                trashButton.innerHTML = '<i class="gg-trash mt-3"></i>'; // Çöp kutusu ikonu

                trashButton.addEventListener("click", function () {
                    deleteFeature(feature.id); // Silme fonksiyonunu çağır
                });

                propertyBox.appendChild(propertyNameElement);
                propertyRow.appendChild(propertyBox);
                trashButtonContainer.appendChild(trashButton);
                propertyRow.appendChild(trashButtonContainer);

                propertiesContainer.appendChild(propertyRow);
            });
        })
        .catch(error => console.error('Hata:', error));

    // Özelliği silme işlevi
    function deleteFeature(id) {
        var confirmation = confirm("Silmek istiyor musunuz?");

        if (confirmation) {
            // Kullanıcının token bilgisini al
            const token = localStorage.getItem("token");

            fetch('http://localhost:8080/product-feature-category/delete?id=' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 403) {
                            console.log("Token geçersiz. Yönlendiriliyor...");
                            // Token geçersizse login sayfasına yönlendir
                            localStorage.removeItem("token");
                            window.location.href = "/login.html";
                        } else {
                            throw new Error("HTTP Hatası: " + response.status);
                        }
                    }
                    if (response.ok) {
                        console.log("Özellik başarıyla silindi.");
                        window.location.reload(); // Sayfayı yeniden yükle
                    } else {
                        console.error("Özellik silinirken bir hata oluştu.");
                    }
                })
                .catch(error => {
                    console.error('Hata:', error);
                });
        }
    }

});
