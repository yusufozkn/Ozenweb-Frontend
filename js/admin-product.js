$(document).ready(function () {
    // Icona tıklama olayı ekleniyor, popup penceresini görünür hale getiriyor
    $("#addProductButton").click(function () {
        $("#popup-overlay").addClass("show");
        $("#popup").addClass("show");
    });

    // Popup dışına tıklanınca popup penceresi kapatılıyor
    $("#popup-overlay").click(function () {
        $(this).removeClass("show");
        $("#popup").removeClass("show");
    });

    // Kaydet butonuna tıklanınca veriler alınıp konsola yazdırılıyor ve popup kapatılıyor
    $("#saveButton").click(function () {
        var mainCategory = $("#mainCategory").val();
        var subCategory = $("#subCategory").val();
        var productName = $("#productName").val();
        var image = $("#image").prop("files")[0];

        // Resim önizleme alanını göster
        $("#imageCaption").show();

        // Verileri konsola yazdırma
        console.log("Ana Kategori:", mainCategory);
        console.log("Alt Kategori:", subCategory);
        console.log("Ürün İsmi:", productName);
        console.log("Seçilen Resim:", image);

        // Popup'ı kapat
        $("#popup-overlay, #popup").removeClass("show");
    });

    // Resim seçme işlevi
    $("#image").change(function (event) {
        var file = event.target.files[0];

        // Resmi önizle
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = $("<img>").attr("src", e.target.result).css({"max-width": "100%", "height": "auto"});
            $("#preview").empty().append(img);
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

    // Ana kategori dropdown menüsünü doldur
    $.each(categories, function (index, category) {
        $("<option>").val(category.id).text(category.name).appendTo("#mainCategory");
    });

    // Üst kategori seçildiğinde alt kategorileri doldur
    $("#mainCategory").change(function () {
        var selectedCategoryId = parseInt($(this).val());
        var selectedCategory = $.grep(categories, function(category){ return category.id === selectedCategoryId; })[0];

        $("#subCategory").empty(); // Alt kategori dropdown'ını temizle

        $.each(selectedCategory.subCategories, function (index, subCategory) {
            $("<option>").val(subCategory.id).text(subCategory.name).appendTo("#subCategory");
        });
    });
});
