// Sayfa yüklenmeden önce API isteği göndermek için
(function () {
    // API endpoint'i
    var apiUrl = 'http://localhost:8080/product/hello'

    // Fetch kullanarak GET isteği gönderme
    fetch(apiUrl)
        .then(response => {
            const reader = response.body.getReader();

            // read() fonksiyonu bir promise döndürür
            return reader.read();
        })
        .then(({ done, value }) => {
            // done, okuma işleminin tamamlanıp tamamlanmadığını gösterir
            // value, okunan veriyi içerir

            if (done) {
                console.log("Veri okuma tamamlandı");
                return;
            }

            // value, Uint8Array türünde bir veri parçasıdır
            console.log("Okunan veri:", new TextDecoder().decode(value));
            const okunanveri = new TextDecoder().decode(value)
            
            const kategori = document.getElementById("kategori")

            kategori.innerText = okunanveri
            // Bir sonraki parçayı okumak için read() fonksiyonunu tekrar çağırın
        })
        .catch(error => {
            console.error('Hata oluştu:', error);
        });
})();

