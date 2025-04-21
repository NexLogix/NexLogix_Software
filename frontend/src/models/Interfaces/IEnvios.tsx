export interface Ciudad {
    idCiudad: number;
    nombre: string;
    precioCiudad: string;
  }
  
  export interface Recogida {
    idRecogida: number;
    fechaRecogidaSeleccionada: string;
    fechaRecogidaFinal: string;
    direccionRecogida: string;
    ciudad: Ciudad;
    precioCiudad: string;
  }
  
  export interface Entrega {
    idEntrega: number;
    fechaEntregaSeleccionada: string;
    fechaEntregaFinal: string;
    direccionEntrega: string;
    ciudad: Ciudad;
    precioCiudad: string;
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
  }