export interface IArea { // Define una interfaz TypeScript llamada IArea para representar un área
    idArea: number; // Propiedad que almacena el identificador único del área, de tipo número
    nombreArea: string; // Propiedad que almacena el nombre del área, de tipo cadena
    descripcionArea: string; // Propiedad que almacena la descripción del área, de tipo cadena
  }
  
  export interface IPuesto { // Define una interfaz TypeScript llamada IPuesto para representar un puesto de trabajo
    idPuestos: number; // Propiedad que almacena el identificador único del puesto, de tipo número
    nombrePuesto: string; // Propiedad que almacena el nombre del puesto, de tipo cadena
    fechaAsignacionPuesto: string; // Propiedad que almacena la fecha de asignación del puesto, de tipo cadena
    descripcionPuesto: string; // Propiedad que almacena la descripción del puesto, de tipo cadena
    idArea: number; // Propiedad que almacena el identificador del área asociada al puesto, de tipo número
    areas: IArea; // Propiedad que almacena un objeto de tipo IArea, representando el área relacionada con el puesto
  }
  
  export interface IPuesto_ApiResponse<T> { // Define una interfaz TypeScript genérica llamada IPuesto_ApiResponse para estructurar las respuestas de la API
    success: boolean; // Propiedad que indica si la operación fue exitosa, de tipo booleano
    message: string; // Propiedad que contiene un mensaje descriptivo de la respuesta, de tipo cadena
    data: T; // Propiedad genérica que contiene los datos principales de la respuesta, cuyo tipo es definido por el parámetro T
    errors?: Record<string, string>; // Propiedad opcional que contiene un objeto con errores específicos, donde las claves y valores son cadenas
    status?: number; // Propiedad opcional que almacena el código de estado HTTP de la respuesta, de tipo número
  }