document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".gg-add-r");
    var popupOverlay = document.getElementById("popup-overlay");
    var popup = document.getElementById("popup");

    addButton.addEventListener("click", function () {
        popupOverlay.classList.add("show");
        setTimeout(function () {
            popup.classList.add("show");
        }, 100); // 100 milisaniyede açılma süresi
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
});