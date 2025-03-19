import { useState } from "react";

const CrearUsuarios = () => {

    const [formData, setFormData] = useState({
        documentoIdentidad: "",
        nombreCompleto: "",
        email: "",
        numContacto: "",
        contrasena: "",
        direccionResidencia: "",
        fechaCreacion: "",
        puesto: "",
        rol: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Usuario creado:", formData);
      };

    return (
        
            <div className="container mt-4 mb-4">
                <h2 className="mb-4">Crear Usuario</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Documento de Identidad</label>
                                <input type="text" className="form-control" name="documentoIdentidad" value={formData.documentoIdentidad} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" className="form-control" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Número de Contacto</label>
                                <input type="tel" className="form-control" name="numContacto" value={formData.numContacto} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Dirección de Residencia</label>
                                <input type="text" className="form-control" name="direccionResidencia" value={formData.direccionResidencia} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Rol</label>
                                <select className="form-select" name="rol" value={formData.rol} onChange={handleChange} required>
                                    <option value="">Seleccione un rol</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Empleado">Empleado</option>
                                    <option value="Conductor">Conductor</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Area a cargo</label>
                                <select className="form-select" name="rol" value={formData.rol} onChange={handleChange} required>
                                <option value="Almacén">Almacén</option>
                                    <option value="Logística">Logística</option>
                                    <option value="Embalaje">Embalaje</option>
                                    <option value="Calidad">Calidad</option>
                                    <option value="Distribución">Distribución</option>
                                    <option value="Recepción de Mercancía">Recepción de Mercancía</option>
                                    <option value="Despacho">Despacho</option>
                                    <option value="Devoluciones">Devoluciones</option>
                                    <option value="Gestión de Inventarios">Gestión de Inventarios</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Seguridad y Control">Seguridad y Control</option>
                                    <option value="Atención al Cliente">Atención al Cliente</option>
                                    <option value="Administración">Administración</option>
                                    <option value="Planificación y Coordinación">Planificación y Coordinación</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Puesto</label>
                                <select className="form-select" name="puesto" value={formData.puesto} onChange={handleChange} required>
                                    <option value="Jefe de Bodega">Jefe de Bodega</option>
                                    <option value="Auxiliar de Bodega">Auxiliar de Bodega</option>
                                    <option value="Logística">Logística</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Calidad">Calidad</option>
                                    <option value="Devoluciones">Devoluciones</option>
                                    <option value="Supervisor de Envíos">Supervisor de Envíos</option>
                                    <option value="Coordinador de Rutas">Coordinador de Rutas</option>
                                    <option value="Operario de Carga">Operario de Carga</option>
                                    <option value="Administrador de Almacén">Administrador de Almacén</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Confirmar contrasena</label>
                                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Crear Usuario</button>
                            </div>
                    </form>
            </div>
        );
    };

export default CrearUsuarios;
