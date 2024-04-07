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
    // Sayfa yüklendiğinde yapılacak işlemler

    // Şu anki URL'den productCodeId'yi al
    const urlParams = new URLSearchParams(window.location.search);
    const productCodeId = urlParams.get('productCodeId');

    // GET isteği yapmak için fonksiyon
    function fetchData(productCodeId) {
        fetch(`http://localhost:8080/product-code/getByProductCode?productCodeId=${productCodeId}`)
            .then(response => response.json())
            .then(data => {
                // Gelen verileri tabloya doldur
                fillTable(data);
            })
            .catch(error => console.error('Error:', error));
    }

    // Tabloyu doldurmak için fonksiyon
    function fillTable(data) {
        // Tabloyu oluştur
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Tablo başlık satırı
        const headerRow = document.createElement('tr');
        const codeNameHeader = document.createElement('th');
        codeNameHeader.textContent = 'KOD';
        headerRow.appendChild(codeNameHeader);

        data.productFeatureDtos.forEach(feature => {
            const categoryHeader = document.createElement('th');
            categoryHeader.textContent = feature.productFeatureCategoryName;
            headerRow.appendChild(categoryHeader);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Tablo içeriği
        const bodyRow = document.createElement('tr');
        const codeNameCell = document.createElement('td');
        codeNameCell.textContent = data.productCodeName;
        bodyRow.appendChild(codeNameCell);

        data.productFeatureDtos.forEach(feature => {
            const valueCell = document.createElement('td');
            valueCell.textContent = feature.productFeatureValue;
            bodyRow.appendChild(valueCell);
        });

        tbody.appendChild(bodyRow);
        table.appendChild(tbody);

        // Tabloyu sayfaya ekle
        const tableContainer = document.querySelector('.product-wap'); // .product-wap sınıfını değiştirdim
        tableContainer.insertBefore(table, tableContainer.lastElementChild.previousElementSibling); // tabloyu istediğiniz yere ekliyoruz
    }

    // fetchData fonksiyonunu çağır
    fetchData(productCodeId);
});


document.addEventListener("DOMContentLoaded", function () {
    var dropdownCounter = 0; // Dropdown sayacı

    // Dropdown'u dolduracak fonksiyon
    function populateDropdown(select, categories) {
        select.innerHTML = ''; // Önceki seçenekleri temizle

        // Her kategori için bir seçenek oluştur ve dropdown'a ekle
        categories.forEach(function (category) {
            var option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.categoryName;
            select.appendChild(option);
        });
    }

    // GET isteği göndererek kategorileri al ve dropdown'u doldur
    function fetchAndPopulateDropdown(select) {
        fetch('http://localhost:8080/product-feature-category/getAll')
            .then(response => {
                if (response.ok) {
                    return response.json(); // JSON verisini al ve işle
                }
                throw new Error('Network response was not ok.');
            })
            .then(categories => {
                // Dropdown'u dolduracak fonksiyonu çağır
                populateDropdown(select, categories);
            })
            .catch(error => console.error('Hata:', error));
    }

    // URL'den ürün ID'sini al
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get("productCodeId");

    console.log(productId)

    // Ekle butonunu oluştur
    var addButton = document.createElement("button");
    addButton.textContent = "Ekle";
    addButton.classList.add("button", "add-button");
    addButton.addEventListener("click", function () {
        addNewInputRow(); // Yeni giriş satırı ekleme işlevini çağır
    });

    // Kaydet butonu oluştur
    var saveButton = document.createElement("button");
    saveButton.textContent = "Kaydet";
    saveButton.classList.add("button", "save-button");
    // Kaydet butonuna tıklanınca çalışacak fonksiyonu henüz belirlemedik, bu backend ile bağlandığında yapılacak

    // Dropdown container
    var dropdownContainer = document.getElementById("dropdownContainer");

    // Ekle ve Kaydet butonlarını dropdownContainer'a ekle
    dropdownContainer.appendChild(addButton);
    dropdownContainer.appendChild(saveButton);

    // İlk giriş satırını oluştur
    addNewInputRow();

    // Kaydet butonuna tıklandığında çalışacak fonksiyon
    saveButton.addEventListener("click", function () {
        // Kullanıcının token bilgisini al
        const token = localStorage.getItem("token");

        // Seçenekleri ve değerleri al
        var productCodeId = productId; // URL'den alınan productCodeId
        console.log(productId)
        var productFeatures = [];

        var inputDivs = document.querySelectorAll(".input-row");

        inputDivs.forEach(function (div) {
            var select = div.querySelector("select");
            var option = select.value;
            var input = div.querySelector(".value-input");
            var value = input.value;
            productFeatures.push({ productFeatureCategoryId: option, productFeatureValue: value });
        });

        // Alınan seçenekleri ve değerleri işlemek için buraya yazabilirsiniz
        // Bu kısımda seçimler ve değerlerin backend'e gönderilmesi sağlanacak
        console.log("productCodeId:", productCodeId);
        console.log("productFeatures:", productFeatures);

        // POST isteği gönderme
        var requestData = {
            productCodeId: productCodeId,
            productFeatures: productFeatures
        };

        fetch('http://localhost:8080/product-feature/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Token'i istek başlığına ekle
            },
            body: JSON.stringify(requestData)
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
                console.log('POST isteği başarıyla gönderildi.');
                window.location.reload();
                // İsteğin başarılı olduğu durumda yapılacak işlemleri buraya ekleyebilirsiniz.
            })
            .catch(error => console.error('Hata:', error));
    });


    // Yeni giriş satırı ekleyen işlev
    function addNewInputRow() {
        var inputRow = document.createElement("div");
        inputRow.classList.add("input-row");

        // Dropdown seçeneği oluştur
        var select = document.createElement("select");
        select.id = "categorySelect" + dropdownCounter; // Benzersiz ID ekle
        dropdownCounter++; // Dropdown sayacını artır
        fetchAndPopulateDropdown(select); // Dropdown'u doldur

        // Değer giriş alanı oluştur
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("value-input");
        input.placeholder = "Değer girin";

        // Sil butonu oluştur
        var removeButton = document.createElement("button");
        removeButton.textContent = "Sil";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", function () {
            inputRow.remove(); // Özelliği içeren satırı kaldır
        });

        // Elementleri giriş satırına ekle
        inputRow.appendChild(select);
        inputRow.appendChild(input);
        inputRow.appendChild(removeButton);

        dropdownContainer.insertBefore(inputRow, addButton); // Yeni giriş satırını ekle
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Geri butonunu seç
    var backButton = document.getElementById("backButton");

    // Geri butonuna tıklama olayını ekle
    backButton.addEventListener("click", function () {
        window.history.back(); // Tarayıcı geçmişinde bir sayfa geri git
    });
});
