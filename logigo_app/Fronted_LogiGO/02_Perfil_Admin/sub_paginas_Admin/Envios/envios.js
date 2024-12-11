// Función para mostrar los detalles del envío en el modal
function mostrarDetalles(envio) {
    let detalles = `
      <strong>Nombre del Envío:</strong> ${envio.nombre}<br>
      <strong>ID Cliente:</strong> ${envio.idCliente}<br>
      <strong>Tamaño:</strong> ${envio.tamaño}<br>
      <strong>Peso:</strong> ${envio.peso}<br>
      <strong>Fecha de Ingreso:</strong> ${envio.fechaIngreso}<br>
      <strong>Fecha de Entrega:</strong> ${envio.entregado ? envio.fechaEntrega : 'En proceso'}<br>
      <strong>Empleado que despachó:</strong> ${envio.empleado}<br>
      ${envio.entregado ? `<strong>Detalles de Entrega:</strong> ${envio.detallesEntrega}` : ''}
    `;
    
    document.getElementById('detalleEnvio').innerHTML = detalles;
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('envioModal'));
    modal.show();
  }
  
  // Agregar el evento de clic a cada fila de la tabla
  document.querySelectorAll('#tablaEnvios tr').forEach(row => {
    row.addEventListener('click', () => {
      const envio = JSON.parse(row.getAttribute('data-envio'));
      mostrarDetalles(envio);
    });
  });
  