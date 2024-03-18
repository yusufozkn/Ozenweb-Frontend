document.addEventListener("DOMContentLoaded", function () {
    // Ürünlerin olduğu elementlerin referansları
    var productElements = document.querySelectorAll('.main-border');

    // Popup ve overlay referansları
    var popupOverlay = document.getElementById("popup-overlay");
    var productPopup = document.getElementById("productPopup");
    var popupImage = document.getElementById("popupImage");
    var popupProductName = document.getElementById("popupProductName");
    var dropdownMenu = document.getElementById("dropdownMenu"); // Değişiklik burada
    var textInput = document.getElementById("textInput");
    var saveButton = document.getElementById("saveButtonPopup"); // Değişiklik burada

    // Popup içeriğini güncelleme fonksiyonu
    function updatePopupContent(productName) {
        // Ürün adını güncelle
        popupProductName.textContent = productName;

        // Dropdown menüsünü güncelle (örnek veri)
        var options = [
            { value: "option1", text: "Seçenek 1" },
            { value: "option2", text: "Seçenek 2" },
            { value: "option3", text: "Seçenek 3" }
        ];
        options.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            dropdownMenu.appendChild(optionElement);
        });
    }

    // Ürünlerin üzerine tıklama olayını dinle
    productElements.forEach(function (productElement, index) {
        productElement.addEventListener("click", function () {
            // Ürün bilgilerini al
            var productName = this.querySelector('.product-name').textContent;
            var productImgSrc = this.querySelector('.product-img').getAttribute('src');

            // Popup içeriğini güncelle
            popupProductName.textContent = productName;
            popupImage.setAttribute('src', productImgSrc);

            // Dropdown menüsünü güncelle (örnek veri)
            dropdownMenu.innerHTML = ""; // Önceki seçenekleri temizle
            updatePopupContent(productName);

            // Popup'ı göster
            popupOverlay.classList.add("show");
            productPopup.classList.add("show");
        });
    });

    // Popup overlay'a tıklama olayını dinle, popup'ı kapat
    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        productPopup.classList.remove("show");
    });

    // Kaydet butonuna tıklama olayını dinle
    saveButton.addEventListener("click", function () {
        var selectedOption = dropdownMenu.value; // Değişiklik burada
        var enteredText = textInput.value;

        // Seçenek ve metin bilgilerini kullanarak istediğiniz işlemi yapabilirsiniz
        console.log("Seçilen Seçenek:", selectedOption);
        console.log("Girilen Metin:", enteredText);

        // Popup'ı kapat
        popupOverlay.classList.remove("show");
        productPopup.classList.remove("show");
    });
});





//###################################################################################

document.addEventListener("DOMContentLoaded", function () {
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

    saveButton.addEventListener("click", function () {
        var mainCategory = document.getElementById("mainCategory").value;
        var subCategory = document.getElementById("subCategory").value;
        var productName = document.getElementById("productName").value;
        var image = document.getElementById("image").files[0];

        // Resim için isim girme alanını göster
        var imageCaption = document.getElementById("imageCaption");
        imageCaption.style.display = "block";

        // Burada kaydetme işlemini yapabilirsiniz. Verileri alıp işleyebilirsiniz.

        // Örnek olarak konsola yazdırma:
        console.log("Ana Kategori:", mainCategory);
        console.log("Alt Kategori:", subCategory);
        console.log("Ürün İsmi:", productName);
        console.log("Seçilen Resim:", image);

        // Popup'ı kapat
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    // Resim seçme işlevi
    var fileInput = document.getElementById("image");
    var preview = document.getElementById("preview");

    fileInput.addEventListener("change", function (event) {
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

    // Örnek kategori verisi
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

    // Kategorileri doldur
    var mainCategoryDropdown = document.getElementById("mainCategory");
    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        mainCategoryDropdown.appendChild(option);
    });

    // Üst kategori seçildiğinde alt kategorileri doldur
    mainCategoryDropdown.addEventListener("change", function () {
        var selectedCategoryId = parseInt(this.value);
        var selectedCategory = categories.find(category => category.id === selectedCategoryId);

        var subCategoryDropdown = document.getElementById("subCategory");
        subCategoryDropdown.innerHTML = ""; // Alt kategori dropdown'ını temizle

        selectedCategory.subCategories.forEach(function (subCategory) {
            var option = document.createElement("option");
            option.value = subCategory.id;
            option.text = subCategory.name;
            subCategoryDropdown.appendChild(option);
        });
    });
});
