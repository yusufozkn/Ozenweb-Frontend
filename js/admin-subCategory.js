document.addEventListener("DOMContentLoaded", function () {
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");
    var categoryDropdown = document.getElementById("categoryDropdown");

    var addButton = document.querySelector(".gg-add-r");
    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");

        fetch('http://localhost:8080/category/getAll')
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    var option = document.createElement("option");
                    option.value = category.id;
                    option.textContent = category.categoryName;
                    categoryDropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Hata:', error));
    });

    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
    });

    var fileInput = document.getElementById("fileInput");
    var fileNameDisplay = document.getElementById("fileName");
    var preview = document.getElementById("preview");

    fileInput.addEventListener("change", function (event) {
        var file = event.target.files[0];

        fileNameDisplay.textContent = file.name;

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

    saveButton.addEventListener("click", function () {
        // Alt kategori adını, üst kategori ID'sini ve resmi al
        var subCategoryName = document.getElementById("subCategoryNameInput").value;
        var categoryId = document.getElementById("categoryDropdown").value;
        var subCategoryImage = preview.querySelector("img").src;

        // POST isteği için alt kategori verilerini oluştur
        var subCategoryData = {
            subCategoryName: subCategoryName,
            categoryId: categoryId,
            subCategoryImage: subCategoryImage
        };

        // Backend'e POST isteği gönderme
        fetch('http://localhost:8080/sub-category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subCategoryData),
        })
            .then(response => response.json())
            .then(data => {
                // POST işlemi başarılı olduysa gerçekleştirilecek işlemler
                console.log('Başarılı:', data);
                console.log(subCategoryData)
                // Başka işlemler yapılabilir, örneğin popup'ı kapatma
                popupOverlay.classList.remove("show");
                popup.classList.remove("show");

                // Sayfayı yenile
                window.location.reload();
            })
            .catch((error) => {
                console.error('Hata:', error);
                window.location.reload();
                // Hata durumunda kullanıcıya bilgilendirme yapılabilir
            });
    });

    var categoryTableBody = document.getElementById("categoryTableBody");

    fetch('http://localhost:8080/sub-category/getWithCategory')
        .then(response => response.json())
        .then(data => {
            function addCategory(categoryData) {
                var categoryId = categoryData.categoryId;
                var categoryName = categoryData.categoryName;
                var categoryImage = categoryData.categoryImage;

                var categoryRow = `
                    <tr>
                        <td rowspan="${categoryData.subCategories.length + 1}">
                            <div class="category-info">
                                <img src="data:image/jpeg;base64,${categoryImage}" alt="${categoryName}" class="category-image">
                                <span class="category-name">${categoryName}</span>
                            </div>
                        </td>
                    </tr>
                `;

                categoryTableBody.innerHTML += categoryRow;

                categoryData.subCategories.forEach((subCategory, index) => {
                    var subCategoryId = subCategory.subCategoryId;
                    var subCategoryName = subCategory.subCategoryName;
                    var subCategoryImage = subCategory.subCategoryImage;

                    var subCategoryRow = `
                        <tr>
                            <td>
                                <div class="category-info">
                                    <img src="data:image/jpeg;base64,${subCategoryImage}" alt="${subCategoryName}" class="category-image">
                                    <span class="category-name">${subCategoryName}</span>
                                </div>
                            </td>
                            <td>
                                <button class="trash-button" data-category-id="${categoryId}" data-sub-category-id="${subCategoryId}" data-index="${index}"><i class="gg-trash"></i></button>
                            </td>
                        </tr>
                    `;
                    categoryTableBody.innerHTML += subCategoryRow;
                });
            }

            // Kullanımı
            data.forEach(addCategory);

        })
        .catch(error => console.error('Hata:', error));

});
