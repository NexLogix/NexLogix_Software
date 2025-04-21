export interface User {
  idUser: number;
  nombreUsuario: string;
  email: string;
}

export interface Ciudad {
  idCiudad: number;
  nombre: string;
  precioCiudad: string;
}

export interface Recogida {
  idRecogida: number;
  fechaRecogidaSeleccionada: string;
  fechaRecogidaFinal: string; // disponible pero para PATCH o PUT, no la usamos en POST
  direccionRecogida: string;
  ciudad: Ciudad;
}

export interface Entrega {
  idEntrega: number;
  fechaEntregaSeleccionada: string;
  fechaEntregaFinal: string; // disponible pero para PATCH o PUT, no la usamos en POST
  direccionEntrega: string;
  ciudad: Ciudad;
}

export interface CategoriaEnvio {
  idCategoria: number;
  nombreCategoria: string;
  precioCategoria: string;
  descripcion: string;
}

export interface Envio {
  idEnvio: number;
  nombreRemitente: string;
  num_ContactoRemitente: string;
  nombreDestinatario: string;
  num_ContactoDestinatario: string;
  metodoPago: string;
  costosTotal_Envio: string;
  fechaEnvio: string;
  recogidas: Recogida;
  entregas: Entrega;
  categoria_envio: CategoriaEnvio;
  user?: User;
}

// Interfaces para los datos enviados al backend
export interface RecogidaData {
  fechaRecogidaSeleccionada: string;
  direccionRecogida: string;
  idCiudad: number;
}

export interface EntregaData {
  fechaEntregaSeleccionada: string;
  direccionEntrega: string;
  idCiudad: number;
}

export interface EnvioData {
  nombreRemitente: string;
  num_ContactoRemitente: string;
  nombreDestinatario: string;
  num_ContactoDestinatario: string;
  metodoPago: string;
  idRecogida: number;
  idEntrega: number;
  idCategoria: number;
}