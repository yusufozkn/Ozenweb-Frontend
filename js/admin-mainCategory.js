document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".gg-add-r");
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");
    var saveButton = document.getElementById("saveButton"); // saveButton tanımlanıyor

    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        popup.classList.add("show");
    });

    popupOverlay.addEventListener("click", function () {
        popupOverlay.classList.remove("show");
        popup.classList.remove("show");
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

    // Kategori bilgilerini backend'e gönderme işlevi
    saveButton.addEventListener("click", function () {
        const token = localStorage.getItem("token")
        console.log(token)
        var categoryName = document.getElementById("imageCaption").value;
        var categoryImage = preview.querySelector("img").src;

        // Kategori bilgilerini oluştur
        var categoryData = {
            categoryName: categoryName,
            categoryImage: categoryImage
        };

        // Backend'e POST isteği gönderme
        fetch('http://localhost:8080/category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(categoryData),
        })
            .then(response => response.json())
            .then(data => {
                // POST işlemi başarılı olduysa gerçekleştirilecek işlemler
                console.log('Başarılı:', data);

                console.log(data.status)//-----------------------------------------------------------403->logine gitsin-------------------
                // Sayfayı yeniden yükle
                window.location.reload();
                // Başka işlemler yapılabilir, örneğin pop-up'ı kapatma
                popupOverlay.classList.remove("show");
                popup.classList.remove("show");
            })
            .catch((error) => {
                console.error('Hata:', error);



                window.location.reload();
                // Hata durumunda kullanıcıya bilgilendirme yapılabilir
            });
    });

    // Backend'den kategorileri almak için fetch işlemi
    fetch('http://localhost:8080/category/getAll')
        .then(response => response.json())
        .then(data => {
            // Gelen kategorileri işle
            var categoryContainer = document.querySelector(".row.py-3.text-center");
            categoryContainer.innerHTML = ""; // Önceki içeriği temizle

            function addCategory(category) {
                var categoryDiv = document.createElement("div");
                categoryDiv.classList.add("col-md-3", "main-border");

                var image = createImage(category.categoryImage);
                var categoryName = document.createElement("div");
                categoryName.textContent = category.categoryName;

                var deleteButton = createDeleteButton(category.id);

                categoryDiv.appendChild(image);
                categoryDiv.appendChild(categoryName);
                categoryDiv.appendChild(deleteButton);
                categoryContainer.appendChild(categoryDiv);
            }

            function createImage(base64String) {
                var image = document.createElement("img");
                image.classList.add("img-fluid");
                image.style.height = "180px";
                image.style.objectFit = "cover";
                image.src = "data:image/jpeg;base64," + base64String; // JPEG formatı örnek olarak kullanıldı, resmin türüne göre değiştirilebilir.
                return image;
            }

            function createDeleteButton(id) {
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Sil";
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.addEventListener("click", function () {
                    deleteCategory(id);
                });
                return deleteButton;
            }

            // Kullanımı
            data.forEach(addCategory);
        })
        .catch(error => console.error('Hata:', error));

    // Kategoriyi silme işlevi
    function deleteCategory(id) {
        // Silme işleminden önce kullanıcıya onay mesajı göster
        var confirmation = confirm("Silmek istiyor musunuz?");

        if (confirmation) {
            // Silme işlemi
            fetch('http://localhost:8080/category/delete?id=' + id, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Kategori başarıyla silindi.");
                        // Sayfayı yeniden yükle
                        window.location.reload();
                    } else {
                        console.error("Kategori silinirken bir hata oluştu.");
                    }
                })
                .catch(error => {
                    console.error('Hata:', error);
                });
        }
    }

});
