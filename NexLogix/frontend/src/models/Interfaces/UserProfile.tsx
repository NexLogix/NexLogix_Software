export interface UserProfile {
        ID: number;
        documentoIdentidad: string;
        nombreCompleto: string;
        email: string;
        numContacto: string;
        direccionResidencia: string;
        fechaCreacion: string;
        Role: {
            nombreRole: string;
            descripcionRole: string;
            fechaAsignacionDelRole: string;
        };
        Puesto: {
            nombrePuesto: string;
            descripcionPuesto: string;
        };
}   