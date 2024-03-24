document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".gg-add-r");
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");

    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    // Kaydet butonuna tıklandığında çalışacak fonksiyon
    document.getElementById("saveButton").addEventListener("click", function () {
        // Seçilen seçeneğin değerini al
        var selectedOption = document.getElementById("categoryDropdown").value;

        // Eğer "Seçiniz" seçeneği seçili kaldıysa uyarı göster
        if (!selectedOption) {
            alert("Lütfen bir seçenek seçiniz!");
            return;
        }

        // Kaydetme işlemini buraya yazabilirsiniz
        // Örneğin: form.submit() gibi bir işlem
    });

    // Dropdown değiştirildiğinde çalışacak fonksiyon
    document.getElementById("categoryDropdown").addEventListener("change", function () {
        // Seçilen seçeneğin değerini al
        var selectedOption = document.getElementById("categoryDropdown").value;
        var selectedOptionInfo = document.getElementById("selectedOptionInfo");

        // Varsayılan seçenek seçilmişse, hiçbir şey gösterme
        if (!selectedOption) {
            selectedOptionInfo.innerHTML = "";
            return;
        }

        // Seçeneğe göre resim ve metni güncelle
        if (selectedOption === "option1") {
            selectedOptionInfo.innerHTML = '<img src="assets/img/banner_img_01.jpg" alt="Resim 1" style="width: 100px; height: 100px;"> <span style="margin-left: 20px;">Örnek İsim 1</span>';
        } else if (selectedOption === "option2") {
            selectedOptionInfo.innerHTML = '<img src="assets/img/banner_img_02.jpg" alt="Resim 2" style="width: 100px; height: 100px;"> <span style="margin-left: 20px;">Örnek İsim 2</span>';
        } else if (selectedOption === "option3") {
            selectedOptionInfo.innerHTML = '<img src="assets/img/banner_img_03.jpg" alt="Resim 3" style="width: 100px; height: 100px;"> <span style="margin-left: 20px;">Örnek İsim 3</span>';
        }
    });

    // Resim seçme işlevi
    var fileInput = document.getElementById("fileInput");
    var fileNameDisplay = document.getElementById("fileName");
    var preview = document.getElementById("preview");
    var imageCaption = document.getElementById("imageCaption");

    fileInput.addEventListener("change", function (event) {
        var file = event.target.files[0];

        // Seçilen dosyanın adını göster
        fileNameDisplay.textContent = file.name;

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

        // Resim için isim girme alanını göster
        imageCaption.style.display = "block";
    });
});



//-------------------------------------------------------------------------------------tablo
// Örnek veri: Üst kategori ve alt kategori bilgileri

var categories = [
    {
        categoryName: "URUN merdiven 1",
        categoryImage: "assets/img/banner_img_03.jpg",
        subCategories: [
            { subCategoryName: "AKG-1" },
            { subCategoryName: "AKG-2" },
            { subCategoryName: "AKG-3" },
            { subCategoryName: "AKG-4" },
            { subCategoryName: "AKG-5" }
            // Diğer alt kategoriler buraya eklenebilir
        ]
    },

    // Diğer üst kategoriler buraya eklenebilir
];

// Tablo içeriğini oluşturan fonksiyon
function createCategoryTable() {
    var tableBody = document.getElementById("categoryTableBody");
    tableBody.innerHTML = ""; // Tabloyu temizle

    categories.forEach(function (category, categoryIndex) {
        var rowSpan = category.subCategories.length || 1; // Satır sayısı (alt kategorilerin sayısı veya 1)

        var categoryInfo = `
                <td rowspan="${rowSpan}">
                    <div class="category-info">
                        <img src="${category.categoryImage}" alt="${category.categoryName}" class="category-image">
                        <span class="category-name">${category.categoryName}</span>
                    </div>
                </td>
            `;

        // İlk satır
        var firstRow = `
                <tr>
                    ${categoryInfo}
                    <td >
                        <div class="category-info">
                            
                            <span class="category-name h5">${category.subCategories[0].subCategoryName}</span>
                        </div>
                    </td>
                    <td>
                        <button class="view-product-button" data-category-index="${categoryIndex}" data-sub-category-index="${i}">Görüntüle</button>
                    </td>
                    <td>
                        <button class="trash-button" data-category-index="${categoryIndex}" data-sub-category-index="${i}"><i class="gg-trash"></i></button>
                    </td>
                </tr>
            `;

        // İlk satırı tabloya ekle
        tableBody.innerHTML += firstRow;

        // Diğer alt kategorileri tabloya ekle
        for (var i = 1; i < category.subCategories.length; i++) {
            var subCategory = category.subCategories[i];
            var row = `
                    <tr>
                        <td>
                            <div class="category-info">
                                <span class="category-name h5">${subCategory.subCategoryName}</span>
                            </div>
                        </td>
                        <td>
                            <button class="view-product-button" data-category-index="${categoryIndex}" data-sub-category-index="${i}">Görüntüle</button>
                        </td>
                        <td>
                            <button class="trash-button" data-category-index="${categoryIndex}" data-sub-category-index="${i}"><i class="gg-trash"></i></button>
                        </td>
                    </tr>
                `;

            // Satırı tabloya ekle
            tableBody.innerHTML += row;
        }
    });

    // Tüm "View Product" düğmelerine tıklandığında yönlendirme yap
    var viewProductButtons = document.querySelectorAll('.view-product-button');
    viewProductButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var categoryIndex = event.target.getAttribute('data-category-index');
            var subCategoryIndex = event.target.getAttribute('data-sub-category-index');
            var productPage = "admin-singleProductFeatureAdd"; // Ürün sayfasının URL'si

            // İstenilen ürün sayfasına yönlendirme yap
            // Örneğin: window.location.href = productPage + "?category=" + categoryIndex + "&subcategory=" + subCategoryIndex;

            window.location.href = productPage + ".html";//oldu la .html buraya ekliyince:D
        });
    });
}

// Sayfa yüklendiğinde tabloyu oluştur
document.addEventListener("DOMContentLoaded", function () {
    createCategoryTable();

    // Cop kutusu butonlarını seç
    var trashButtons = document.querySelectorAll(".trash-button");
    trashButtons.forEach(function (trashButton) {
        trashButton.addEventListener("click", function () {
            // Cop kutusu butonuna tıklanınca yapılacak işlemleri burada yapabilirsiniz
            var categoryIndex = trashButton.getAttribute("data-category-index");
            var subCategoryIndex = trashButton.getAttribute("data-sub-category-index");

            // Buradan categoryIndex ve subCategoryIndex kullanarak istediğiniz işlemleri gerçekleştirebilirsiniz
            console.log("Silme işlemi yapılacak kategori indeksi: ", categoryIndex);
            console.log("Silme işlemi yapılacak alt kategori indeksi: ", subCategoryIndex);
        });
    });
});

