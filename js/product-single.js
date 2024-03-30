document.addEventListener("DOMContentLoaded", function () {
    // URL'den productId parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    console.log(productId)

    // Backend'den ürün bilgilerini almak için fetch işlemi
    fetch('http://localhost:8080/product/getByProductId?productId=' + productId)
        .then(response => response.json())
        .then(data => {
            // Gelen ürün bilgilerini işle
            console.log(data);

            // Ürün bilgilerini kullanarak sayfayı güncelleme
            // Örnek olarak, ürün adını ve ana metni gösterelim
            document.getElementById("productName").innerText = data.productName;
            document.getElementById("productMainText").innerText = data.productMainText;
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
window.onclick = function(event) {
    var popup = document.getElementById('popupContainer');
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

