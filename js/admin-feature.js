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

    // Resim seçme işlevi kaldırıldı

    var imageCaption = document.getElementById("imageCaption");

    // Resim seçme işlevi yerine sadece isim girme alanını göster
    imageCaption.style.display = "block";
});



//---
document.addEventListener("DOMContentLoaded", function () {
    var propertiesContainer = document.getElementById("propertiesContainer");

    // Örnek özellik isimleri
    var propertyNames = [
        "Renk",
        "Boyut",
        "Malzeme",
        "denem",
        "1",
        "ozellikelr",
        "burayaymis",
        "bundan cok olsa?",
        "nasil olur ki?",
        "Renk",
        "Boyut",
        "Malzeme",
        "denem",
        "1",
        "ozellikelr",
        "burayaymis",
        "bundan cok olsa?",
        "nasil olur ki?"
        // Ek özellik isimleri buraya eklenebilir
    ];

    // Her özelliği kutucuk olarak ve yanına çöp kutusu ikonu ekleyerek ekle
    propertyNames.forEach(function (propertyName) {
        var propertyRow = document.createElement("div");
        propertyRow.classList.add("row");

        var propertyBox = document.createElement("div");
        propertyBox.classList.add("properties-container", "col-lg-11");

        var propertyNameElement = document.createElement("div");
        propertyNameElement.classList.add("property-box");
        propertyNameElement.textContent = propertyName;

        var trashButtonContainer = document.createElement("div");
        trashButtonContainer.classList.add("col-lg-1");

        var trashButton = document.createElement("button");
        trashButton.classList.add("trash-button", "parent");
        trashButton.innerHTML = '<i class="gg-trash"></i>'; // İkon buraya eklendi

        propertyBox.appendChild(propertyNameElement);
        propertyRow.appendChild(propertyBox);
        trashButtonContainer.appendChild(trashButton);
        propertyRow.appendChild(trashButtonContainer);

        propertiesContainer.appendChild(propertyRow);
    });
});
