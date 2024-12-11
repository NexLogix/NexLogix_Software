window.onload = function() {
    document.getElementById('cerrar_sesion').addEventListener('click', function() {
        window.location.href = '/01_Login/Prueba_Login_Nuevo/Login.html';
    });
}


/*Central donde se despliegan las subpaginas o pagonas desplegables por cada boton en UI ADMIN*/

$(document).ready( function () {
    $("#pagina_Gestionar_Usuarios").click( function () {
        $("#columna_contenido_Desplegables_pagesAdmin").load("/02_Perfil_Admin/sub_paginas_Admin/01_Gentionar_Usuarios.html")
    });
});

$(document).ready( function() {
    $("#pagina_Gestionar_Envíos").click(function(){
        $("#columna_contenido_Desplegables_pagesAdmin").load("/02_Perfil_Admin/sub_paginas_Admin/02_Gestionar_Emvios.html");
    });
});

$(document).ready( function() {
    $("#pagina_Gestionar_Rutas").click(function(){
        $("#columna_contenido_Desplegables_pagesAdmin").load("/02_Perfil_Admin/sub_paginas_Admin/03_Gestionar_Rutas.html");
    });
});

$(document).ready( function() {
    $("#pagina_Contactar_Soporte").click(function(){
        $("#columna_contenido_Desplegables_pagesAdmin").load("/02_Perfil_Admin/sub_paginas_Admin/04_Contactar_Soporte.html");
    });
});

$(document).ready( function() {
    $("#pagina_Ver_Estadísticas").click(function(){
        $("#columna_contenido_Desplegables_pagesAdmin").load("/02_Perfil_Admin/sub_paginas_Admin/05_Ver_Estadísticas.html");
    });
});

function loadPage(url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = data;
  
        // Asegurar que el contenido cargado se ajuste
        contenedor.style.width = "100%";
        contenedor.style.height = "100%";
      })
      .catch(error => console.error("Error cargando la página:", error));
  }
  