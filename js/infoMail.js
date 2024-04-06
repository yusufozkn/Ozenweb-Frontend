document.addEventListener('DOMContentLoaded', function () {
    // Form elemanını seçme
    const form = document.getElementById('info-mail');
    // Gönder butonunu seçme
    const submitButton = form.querySelector('.bttn');
    // Boş veri uyarı elementini seçme
    const emptyFieldAlert = document.getElementById('empty-field-alert');
    // Gönderme durumu metni
    const submittingText = document.getElementById('submitting-text');

    // Form gönderme durumunu takip etmek için bir değişken
    let isSubmitting = false;

    // Form gönderildiğinde çalışacak işlev
    const handleSubmit = function (event) {
        // Sayfanın yeniden yüklenmesini engelle
        event.preventDefault();

        // Gönderme işlemi devam ediyorsa tekrar göndermeyi engelle
        if (isSubmitting) {
            return;
        }

        // Form verilerini al
        const formData = new FormData(form);

        // Boş veri kontrolü
        let hasEmptyFields = false;
        formData.forEach(value => {
            if (!value.trim()) {
                hasEmptyFields = true;
            }
        });

        // Eğer boş veri varsa göndermeyi engelle ve uyarı göster
        if (hasEmptyFields) {
            emptyFieldAlert.style.display = "block";
            return;
        }

        // Gönderme işlemi başladı, butonu devre dışı bırak ve gönderme durumu metnini göster
        isSubmitting = true;
        submitButton.disabled = true;
        submittingText.style.display = "block";

        // FormData nesnesinden JSON veri oluştur
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // JSON verisini POST isteği ile gönder
        fetch('http://localhost:8080/product/createInfoMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            // Yanıtı kontrol et
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Yanıtı JSON olarak dönüştür
        })
        .then(data => {
            // Yanıtı işle
            console.log('Success:', data);
            // Başarı mesajını göster
            alert("İşlem Başarılı! Mesajınız gönderildi.");
            // Sayfayı yenile
            window.location.reload();
            // İsteği gönderdikten sonra yapılacak işlemler buraya eklenebilir
        })
        .catch(error => {
            console.error('Error:', error);
            // Hata mesajını göster
            // Gönderme işlemi başarısız olduğunda butonu ve görseli yeniden etkinleştir
            isSubmitting = false;
            submitButton.disabled = false;
            submittingText.style.display = "none";
            // Hata durumunda yapılacak işlemler buraya eklenebilir
            window.location.reload();
        });
    };

    // Gönder butonuna tıklandığında formu gönder
    submitButton.addEventListener('click', handleSubmit);
});
