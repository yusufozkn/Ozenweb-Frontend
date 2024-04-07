document.addEventListener("DOMContentLoaded", function () {

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

            // Kullanıcının token bilgisini al
            const token = localStorage.getItem("token");

            // Backend'e POST isteği gönderme
            fetch('http://localhost:8080/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token // Tokeni Authorization başlığına ekle
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Çıkış işlemi başarısız.');
                    }
                    // Tokeni localStorage'den sil
                    
                    // Giriş sayfasına yönlendir
                    localStorage.removeItem("token");
                    window.location.href = "/login.html";
                })
                .catch((error) => {
                    console.error('Hata:', error);
                    // Hata durumunda kullanıcıya bilgilendirme yapılabilir
                    alert(error.message);
                });
        });
    }
});
