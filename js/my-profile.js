
var userName = document.getElementById('userName');
var secondName = document.getElementById('secondName');
var lastName = document.getElementById('userLastName');
var sLastName = document.getElementById('secondLastName');
var phoneNumber = document.getElementById('phoneUser');
var formulario = document.getElementById('form-profile');
var btnGuardar = document.getElementById('boton-guardar');




btnGuardar.addEventListener('click', () => {
    nameUser = localStorage.setItem('name', JSON.stringify(userName.value));


    segName = localStorage.setItem('segNombre', JSON.stringify(secondName.value));

    lastnUser = localStorage.setItem('apellido', JSON.stringify(lastName.value));


    lastnUser2 = localStorage.setItem('segApellido', JSON.stringify(sLastName.value));

    phoneNum = localStorage.setItem('numero', JSON.stringify(phoneNumber.value));



})


document.addEventListener("DOMContentLoaded", (e) => {

    var email = localStorage.getItem("userEmail");
    var email2 = email.replace(/['"]+/g, '')
    let userMail = document.getElementById("userEmail");
    userMail.innerHTML = `${email2}`;


    var nombre = localStorage.getItem("name");
    var nombre1 = nombre.replace(/['"]+/g, '');
    userName.value = `${nombre1}`


    var segundoNom = localStorage.getItem("segNombre");
    var segundoNom1 = segundoNom.replace(/['"]+/g, '');
    secondName.value = `${segundoNom1}`

    var apellido0 = localStorage.getItem("apellido");
    var apellido1 = apellido0.replace(/['"]+/g, '');
    lastName.value = `${apellido1}`

    var apellido2 = localStorage.getItem("segApellido");
    var apellido3 = apellido2.replace(/['"]+/g, '');
    sLastName.value = `${apellido3}`


    var telefono = localStorage.getItem("numero");
    var telefono1 = telefono.replace(/['"]+/g, '');
    phoneUser.value = `${telefono1}`




});
