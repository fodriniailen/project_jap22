var correo = document.getElementById("mail-user");
var pass = document.getElementById("passw");
var parrafo = document.getElementById("warning");
var form = document.getElementById("form-login");
let miPerfil = document.getElementById("my-profile");


form.addEventListener("submit", e => {
    e.preventDefault();

    let warnings = ""
    let entrar = false
    let expReg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,4})+$/
    parrafo.innerHTML = ""

    if (!expReg.test(correo.value)) {
        warnings += `El email no es válido <br>`
        entrar = true
    }

    if (pass.value.length < 8) {
        warnings
            += `La contraseña no es válida <br>`
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        localStorage.setItem('userEmail', JSON.stringify(correo.value));
        window.location.href = "home.html"
        parrafo.innerHTML = "Enviado"
        miPerfil.classList.remove("disabled");
    }


})
