document.addEventListener("DOMContentLoaded", function () {
    // URL'den productId parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    console.log(productId);

    // Backend'den ürün bilgilerini almak için fetch işlemi
    fetch('http://localhost:8080/product/getByProductId?productId=' + productId)
        .then(response => response.json())
        .then(data => {
            // Gelen ürün bilgilerini işle
            console.log(data);

            // Gelen verileri değişkenlere atama
            const {
                id,
                productName,
                productMainText,
                productPropertyText,
                subCategoryId,
                subCategoryName,
                categoryId,
                categoryName,
                productMainImage
            } = data;

            // Ürün bilgilerini kullanarak sayfayı güncelleme
            document.getElementById("productName").innerText = productName;
            document.getElementById("productMainText").innerText = productMainText;
            document.getElementById("productPropertyText").innerText = productPropertyText;

            // Resmi base64 formatına dönüştür ve src özelliğine ata
            const img = document.getElementById("product-detail");
            const base64Image = "data:image/jpeg;base64," + productMainImage;
            img.setAttribute("src", base64Image);


            // Diğer bilgileri de benzer şekilde güncelleyebilirsiniz

        })
        .catch(error => console.error('Hata:', error));
});

// Resmin üzerine tıklandığında pop-up aç
document.querySelectorAll('.card-img').forEach(item => {
    item.addEventListener('click', event => {
        document.getElementById('popupImg').src = item.src;
        document.getElementById('popupContainer').style.display = 'block';
    });
});




// Pop-up'ı kapat
function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}

// Pop-up'ın dışındaki karanlık bölgeye tıklayarak pop-up'ı kapat
window.onclick = function (event) {
    var popup = document.getElementById('popupContainer');
    if (event.target == popup) {
        popup.style.display = "none";
    }
}




document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    fetchData(productId);
});

function fetchData(productId) {
    fetch(`http://localhost:8080/product-code/getByProductId?productId=${productId}`)
        .then(response => response.json())
        .then(data => {
            // Verileri productCodeId'ye göre artan sırada sırala
            const sortedData = data.sort((a, b) => a.productCodeId - b.productCodeId);
            fillTable(sortedData);
        })
        .catch(error => console.error('Error:', error));
}

function fillTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const codeNameHeader = document.createElement('th');
    codeNameHeader.textContent = 'KOD';
    headerRow.appendChild(codeNameHeader);

    if (data.length > 0) {
        const firstProduct = data[0];
        firstProduct.productFeatureDtos.forEach(feature => {
            const categoryHeader = document.createElement('th');
            categoryHeader.textContent = feature.productFeatureCategoryName;
            headerRow.appendChild(categoryHeader);
        });
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    data.forEach(item => {
        const bodyRow = document.createElement('tr');
        const codeNameCell = document.createElement('td');
        codeNameCell.textContent = item.productCodeName;
        bodyRow.appendChild(codeNameCell);

        item.productFeatureDtos.forEach(feature => {
            const valueCell = document.createElement('td');
            valueCell.textContent = feature.productFeatureValue;
            bodyRow.appendChild(valueCell);
        });

        tbody.appendChild(bodyRow);
    });

    table.appendChild(tbody);

    const tableContainer = document.querySelector('.product-table-container');
    tableContainer.appendChild(table);
}

// Butonun id'sini kullanarak butona tıklama olayını dinleme
document.getElementById('offerButton').addEventListener('click', openCustomPopup);


// Yeni popup açma fonksiyonu
function openCustomPopup() {
    document.getElementById('customPopup').style.display = 'block';
}

// Popup'ı kapatma fonksiyonunu güncelleme
function closeCustomPopup() {
    document.getElementById('customPopup').style.display = 'none';
}

// Popup dışındaki karanlık bölgeye tıklamayla da popup'ı kapatma
window.addEventListener('click', function (event) {
    var popup = document.getElementById('customPopup');
    if (event.target === popup) {
        closeCustomPopup(); // Popup'ı kapat
    }
});


// Form gönderme işlemi
document.getElementById('mailForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfanın yenilenmesini önle

    // Form verilerini al
    const formData = new FormData(this);

    // FormData'dan JSON objesi oluştur
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // Ürün ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    // JSON verilerini gönder
    fetch('http://localhost:8080/product/createProductInfoMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...jsonData,
            productId: productId
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Mail gönderimi başarılı.'); // Başarılı mail gönderimini doğrulama
                alert('Mail başarıyla gönderildi!');
                closeCustomPopup(); // Popup'ı kapat
            } else {
                throw new Error('Mail gönderilirken bir hata oluştu!');
            }
        })
        .catch(error => {
            console.error('Hata:', error.message);
            alert('Mail gönderilirken bir hata oluştu!');
        });
});
