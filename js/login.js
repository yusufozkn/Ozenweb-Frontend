document.addEventListener("DOMContentLoaded", function () {

    const login = document.getElementById("login")
    login.addEventListener("click", function () {



        const username = document.getElementById("userName").value
        const userPassword = document.getElementById("userPassword").value
        const userData = {
            userName: username,
            userPassword: userPassword
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
