document.addEventListener("DOMContentLoaded", function () {

    const login = document.getElementById("login")
    login.addEventListener("click", function () {



        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const userData = {
            userName: username,
            userPassword: password
        }

        // Backend'e POST isteği gönderme
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                // POST işlemi başarılı olduysa gerçekleştirilecek işlemler
                console.log('Başarılı:', data);
                localStorage.setItem("token",data.accessToken)
            })
            .catch((error) => {
                console.error('Hata:', error);
                // Hata durumunda kullanıcıya bilgilendirme yapılabilir
            });

    });



});
