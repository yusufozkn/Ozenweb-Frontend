// Sayfa yüklenmeden önce API isteği göndermek için
(function () {
    // API endpoint'i
    var apiUrl = 'http://localhost:8080/product/hello';

    // Fetch kullanarak GET isteği gönderme
    fetch(apiUrl)
        .then(response => {
            // Başarılı bir cevap alındığında JSON'u çözümle
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
        })
        .then(data => {
            // API'den gelen verileri kullan
            console.log(data);
        })
        .catch(error => {
            // Hata durumunda hata mesajını göster
            console.error('There was a problem with the fetch operation:', error);
        });
})();