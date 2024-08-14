function go_to_inicio() {
    location.href = "http://127.0.0.1:5500/login_LogiGO.html";
}
function go_to_pagina_contactanos() {
    location.href = "http://127.0.0.1:5500/contactanos.html";
}

function go_to_pagina_ayuda() {
    location.href = "http://127.0.0.1:5500/pagina_ayuda.html";
}

function go_to_pagina_acerca_de() {
    location.href = "http://127.0.0.1:5500/pagina_acerca%20de.html";
}

var contraseña_perfil_empleado_resepcion = "123456789";
var contraseña_perfil_empleado_bodega = "123456789";
var contraseña_perfil_empleado_conductor = "123456789";
var contraseña_perfil_admin = "putoelqueescriba";
let intentos = 3;
let = bloqueado;

function validar_usuario() {
    if (bloqueado) {
        alert("Tu cuenta está bloqueada. Por favor, contacta al administrador.");
        return;
    }

    var contraseña_usuario = document.getElementById("contraseña_usuario").value;

    if (contraseña_perfil_admin === contrseña_usuario) {
        alert("Contraseña correcta, bienvenido.")
        location.href = "";
    } else {
        if (contraseña_perfil_empleado === contraseña_usuario)
            alert("Es usted biemvenido Administrador")
        location.href = "";
    } 
}

