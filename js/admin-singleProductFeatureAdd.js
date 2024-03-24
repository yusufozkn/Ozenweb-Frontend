document.addEventListener("DOMContentLoaded", function () {
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
        // Seçenekleri ve değerleri al
        var selections = [];
        var inputDivs = document.querySelectorAll(".dropdown-with-value");

        inputDivs.forEach(function (div) {
            var select = div.querySelector("select");
            var option = select.value;
            var input = div.querySelector(".value-input");
            var value = input.value;
            selections.push({ option: option, value: value });
        });

        // Alınan seçenekleri ve değerleri işlemek için buraya yazabilirsiniz
        // Bu kısımda seçimler ve değerlerin backend'e gönderilmesi sağlanacak
        // Backend bağlantısı yapıldığında bu fonksiyon yazılacak
        console.log("Seçenekler ve değerler:", selections);
    });

    // Yeni giriş satırı ekleyen işlev
    function addNewInputRow() {
        var inputRow = document.createElement("div");
        inputRow.classList.add("input-row");

        // Dropdown seçeneği oluştur
        var select = document.createElement("select");
        var option1 = document.createElement("option");
        option1.value = "option1";
        option1.textContent = "Seçenek 1";
        var option2 = document.createElement("option");
        option2.value = "option2";
        option2.textContent = "Seçenek 2";
        var option3 = document.createElement("option");
        option3.value = "option3";
        option3.textContent = "Seçenek 3";

        // Seçenekleri select elementine ekle
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);

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
