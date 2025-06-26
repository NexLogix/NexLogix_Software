import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './../../Styles/NavBar/Administracion/GeneralStyle.css';
import './../../Styles/Home/TablesStyle.css'
import './../../Styles/NavBar/Logistica/ListaVehiculos.css';
import '../../Styles/Home/TablesStyle.css'

// Interfaz para Usuario
interface Usuario {
  idusuarios: number;
  documentoIdentidad: string;
  nombreCompleto: string;
  email: string;
  numContacto?: string;
  direccionResidencia?: string;
  fechaCreacion: string;
  role: string;
  estado: 'ACTIVO' | 'INACTIVO' | 'BLOQUEADO' | 'SUSPENDIDO';
  puesto: string;
}

// Mock de datos para ejemplo visual
const mockUsuarios: Usuario[] = [
  {
    idusuarios: 1,
    documentoIdentidad: "12345678",
    nombreCompleto: "Juan Pérez",
    email: "juan.perez@nexlogix.com",
    numContacto: "3001234567",
    direccionResidencia: "Calle 1 #123",
    fechaCreacion: "2024-01-10",
    role: "Administrador",
    estado: "ACTIVO",
    puesto: "Supervisor"
  },
  {
    idusuarios: 2,
    documentoIdentidad: "87654321",
    nombreCompleto: "Ana López",
    email: "ana.lopez@nexlogix.com",
    numContacto: "3012345678",
    direccionResidencia: "Av. Central 456",
    fechaCreacion: "2024-01-12",
    role: "Empleado",
    estado: "INACTIVO",
    puesto: "Analista"
  },
  {
    idusuarios: 3,
    documentoIdentidad: "11223344",
    nombreCompleto: "Carlos Ramírez",
    email: "carlos.ramirez@nexlogix.com",
    numContacto: "3023456789",
    direccionResidencia: "Cra 10 #45-67",
    fechaCreacion: "2024-01-15",
    role: "Manager",
    estado: "ACTIVO",
    puesto: "Jefe de Área"
  },
  {
    idusuarios: 4,
    documentoIdentidad: "22334455",
    nombreCompleto: "Luisa Martínez",
    email: "luisa.martinez@nexlogix.com",
    numContacto: "3034567890",
    direccionResidencia: "Calle 20 #12-34",
    fechaCreacion: "2024-01-18",
    role: "Conductor",
    estado: "ACTIVO",
    puesto: "Conductor"
  },
  {
    idusuarios: 5,
    documentoIdentidad: "33445566",
    nombreCompleto: "Pedro Gómez",
    email: "pedro.gomez@nexlogix.com",
    numContacto: "3045678901",
    direccionResidencia: "Av. Siempre Viva 742",
    fechaCreacion: "2024-01-20",
    role: "Empleado",
    estado: "BLOQUEADO",
    puesto: "Técnico"
  },
  {
    idusuarios: 6,
    documentoIdentidad: "44556677",
    nombreCompleto: "María Torres",
    email: "maria.torres@nexlogix.com",
    numContacto: "3056789012",
    direccionResidencia: "Calle 50 #30-20",
    fechaCreacion: "2024-01-22",
    role: "Manager",
    estado: "ACTIVO",
    puesto: "Gerente"
  },
  {
    idusuarios: 7,
    documentoIdentidad: "55667788",
    nombreCompleto: "Jorge Herrera",
    email: "jorge.herrera@nexlogix.com",
    numContacto: "3067890123",
    direccionResidencia: "Cra 15 #22-33",
    fechaCreacion: "2024-01-25",
    role: "Administrador",
    estado: "SUSPENDIDO",
    puesto: "Administrador"
  },
  {
    idusuarios: 8,
    documentoIdentidad: "66778899",
    nombreCompleto: "Sandra Díaz",
    email: "sandra.diaz@nexlogix.com",
    numContacto: "3078901234",
    direccionResidencia: "Calle 80 #10-20",
    fechaCreacion: "2024-01-28",
    role: "Empleado",
    estado: "ACTIVO",
    puesto: "Asistente"
  },
  {
    idusuarios: 9,
    documentoIdentidad: "77889900",
    nombreCompleto: "Felipe Castro",
    email: "felipe.castro@nexlogix.com",
    numContacto: "3089012345",
    direccionResidencia: "Av. Las Palmas 123",
    fechaCreacion: "2024-02-01",
    role: "Conductor",
    estado: "INACTIVO",
    puesto: "Conductor"
  },
  {
    idusuarios: 10,
    documentoIdentidad: "88990011",
    nombreCompleto: "Paola Ruiz",
    email: "paola.ruiz@nexlogix.com",
    numContacto: "3090123456",
    direccionResidencia: "Cra 8 #14-56",
    fechaCreacion: "2024-02-05",
    role: "Manager",
    estado: "ACTIVO",
    puesto: "Supervisora"
  },
  {
    idusuarios: 11,
    documentoIdentidad: "99001122",
    nombreCompleto: "Ricardo Mendoza",
    email: "ricardo.mendoza@nexlogix.com",
    numContacto: "3101234567",
    direccionResidencia: "Calle 100 #20-30",
    fechaCreacion: "2024-02-10",
    role: "Empleado",
    estado: "ACTIVO",
    puesto: "Auxiliar"
  },
  {
    idusuarios: 12,
    documentoIdentidad: "10111213",
    nombreCompleto: "Valentina Salazar",
    email: "valentina.salazar@nexlogix.com",
    numContacto: "3112345678",
    direccionResidencia: "Av. El Dorado 321",
    fechaCreacion: "2024-02-12",
    role: "Administrador",
    estado: "BLOQUEADO",
    puesto: "Administrador"
  },
  {
    idusuarios: 13,
    documentoIdentidad: "12131415",
    nombreCompleto: "Camila Ríos",
    email: "camila.rios@nexlogix.com",
    numContacto: "3123456789",
    direccionResidencia: "Calle 90 #15-40",
    fechaCreacion: "2024-02-15",
    role: "Empleado",
    estado: "ACTIVO",
    puesto: "Recepcionista"
  },
  {
    idusuarios: 14,
    documentoIdentidad: "13141516",
    nombreCompleto: "Esteban Vargas",
    email: "esteban.vargas@nexlogix.com",
    numContacto: "3134567890",
    direccionResidencia: "Av. Boyacá 200",
    fechaCreacion: "2024-02-18",
    role: "Conductor",
    estado: "ACTIVO",
    puesto: "Conductor"
  },
  {
    idusuarios: 15,
    documentoIdentidad: "14151617",
    nombreCompleto: "Laura Peña",
    email: "laura.pena@nexlogix.com",
    numContacto: "3145678901",
    direccionResidencia: "Cra 20 #50-60",
    fechaCreacion: "2024-02-20",
    role: "Manager",
    estado: "INACTIVO",
    puesto: "Jefe de Proyectos"
  },
  {
    idusuarios: 16,
    documentoIdentidad: "15161718",
    nombreCompleto: "David Romero",
    email: "david.romero@nexlogix.com",
    numContacto: "3156789012",
    direccionResidencia: "Calle 60 #30-10",
    fechaCreacion: "2024-02-22",
    role: "Empleado",
    estado: "ACTIVO",
    puesto: "Soporte"
  },
  {
    idusuarios: 17,
    documentoIdentidad: "16171819",
    nombreCompleto: "Natalia Cárdenas",
    email: "natalia.cardenas@nexlogix.com",
    numContacto: "3167890123",
    direccionResidencia: "Av. Chile 321",
    fechaCreacion: "2024-02-25",
    role: "Administrador",
    estado: "ACTIVO",
    puesto: "Administrador"
  },
  {
    idusuarios: 18,
    documentoIdentidad: "17181920",
    nombreCompleto: "Santiago Pardo",
    email: "santiago.pardo@nexlogix.com",
    numContacto: "3178901234",
    direccionResidencia: "Cra 7 #12-34",
    fechaCreacion: "2024-02-28",
    role: "Conductor",
    estado: "BLOQUEADO",
    puesto: "Conductor"
  },
  {
    idusuarios: 19,
    documentoIdentidad: "18192021",
    nombreCompleto: "Andrea Molina",
    email: "andrea.molina@nexlogix.com",
    numContacto: "3189012345",
    direccionResidencia: "Calle 70 #40-50",
    fechaCreacion: "2024-03-02",
    role: "Empleado",
    estado: "SUSPENDIDO",
    puesto: "Asistente"
  },
  {
    idusuarios: 20,
    documentoIdentidad: "19202122",
    nombreCompleto: "Oscar Gutiérrez",
    email: "oscar.gutierrez@nexlogix.com",
    numContacto: "3190123456",
    direccionResidencia: "Av. Caracas 100",
    fechaCreacion: "2024-03-05",
    role: "Manager",
    estado: "ACTIVO",
    puesto: "Gerente"
  }
];

const Usuarios: React.FC = () => {
  // Estado de usuarios y búsqueda
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchId, setSearchId] = useState("");
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsuario, setEditUsuario] = useState<Usuario | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // Cargar datos simulados
  useEffect(() => {
    setUsuarios(mockUsuarios);
    setFilteredUsuarios(mockUsuarios);
  }, []);

  // Buscar por ID
  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredUsuarios(usuarios);
    } else {
      setFilteredUsuarios(usuarios.filter(usuario => usuario.idusuarios.toString() === searchId.trim()));
    }
  };

  // Mostrar todos
  const resetSearch = () => {
    setSearchId("");
    setFilteredUsuarios(usuarios);
  };

  // Abrir modal de editar
  const handleEdit = (usuario: Usuario) => {
    setEditUsuario(usuario);
    setShowEditModal(true);
  };

  // Abrir modal de eliminar
  const handleDelete = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setShowDeleteModal(true);
  };

  return (
    <div className='areas_container'>
      <div className="container mt-4">
        {/* Barra de búsqueda y botones */}
        <div className="header-azul mb-3">
          <div className="d-flex align-items-center p-3">
            <i className="bi bi-people-fill me-2" style={{ fontSize: 24 }} />
            <h2 className="mb-0 text-white">Gestión de Usuarios</h2>
          </div>
        </div>
        {/* Barra de búsqueda con 3 botones */}
        {/* --- CAMBIO: Barra de búsqueda igual a VerListaVehiculos --- */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
                <div className="input-group w-100">
                  <span className="input-group-text px-2">
                    <i className="bi bi-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar usuario por ID..."
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                    style={{ minWidth: 0 }}
                  />
                </div>
                <div className="d-flex gap-2 ms-2">
                  {/* --- CAMBIO: Botón Buscar por ID --- */}
                  <button
                    className="btn btn-primary"
                    style={{ minWidth: 140 }}
                    onClick={handleSearch}
                  >
                    Buscar por ID
                  </button>
                  {/* --- CAMBIO: Botón Mostrar todos --- */}
                  <button
                    className="btn btn-success"
                    style={{ minWidth: 140 }}
                    onClick={resetSearch}
                  >
                    Mostrar todos
                  </button>
                  {/* --- CAMBIO: Botón Crear usuario --- */}
                  <button
                    className="btn btn-warning"
                    style={{ minWidth: 140, width: "100%" }}
                    onClick={() => setShowCreateModal(true)}
                  >
                    Crear usuario
                  </button>
                </div>
              </div>
            </div>

            {/* --- CAMBIO: Tabla con columna de acciones --- */}
            <div className="custom-table-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Documento</th>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Contacto</th>
                    <th>Dirección</th>
                    <th>Fecha Creación</th>
                    <th>Rol</th>
                    <th>Estado Usuario</th>
                    <th>Puesto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.length > 0 ? (
                    filteredUsuarios.map((usuario) => (
                      <tr key={usuario.idusuarios}>
                        <td>{usuario.idusuarios}</td>
                        <td>{usuario.documentoIdentidad}</td>
                        <td>{usuario.nombreCompleto}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.numContacto || "-"}</td>
                        <td>{usuario.direccionResidencia || "-"}</td>
                        <td>{usuario.fechaCreacion}</td>
                        <td>{usuario.role}</td>
                        <td>
                          <span className={
                            usuario.estado === "ACTIVO" ? "badge bg-success" :
                            usuario.estado === "INACTIVO" ? "badge bg-secondary" :
                            usuario.estado === "BLOQUEADO" ? "badge bg-danger" :
                            "badge bg-warning text-dark"
                          }>
                            {usuario.estado}
                          </span>
                        </td>
                        <td>{usuario.puesto}</td>
                        <td>
                          {/* --- CAMBIO: Botones de editar y eliminar con tooltip y modal --- */}
                          <div className="d-flex gap-2 justify-content-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEdit(usuario)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(usuario)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center py-4">
                        <div className="text-muted">No se encontraron usuarios</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- CAMBIO: Modal para crear usuario --- */}
        {showCreateModal && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Crear Usuario</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Documento de Identidad</label>
                    <input className="form-control" placeholder="Documento de Identidad" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Nombre Completo</label>
                    <input className="form-control" placeholder="Nombre Completo" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" type="email" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Número de Contacto</label>
                    <input className="form-control" placeholder="Número de Contacto" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Dirección de Residencia</label>
                    <input className="form-control" placeholder="Dirección de Residencia" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Rol</label>
                    <select className="form-control">
                      <option value="">Selecciona un rol...</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Manager">Manager</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Conductor">Conductor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Puesto</label>
                    <select className="form-control">
                      <option value="">Selecciona un puesto...</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Analista">Analista</option>
                      <option value="Jefe de Área">Jefe de Área</option>
                      <option value="Conductor">Conductor</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Gerente">Gerente</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Asistente">Asistente</option>
                      <option value="Recepcionista">Recepcionista</option>
                      <option value="Auxiliar">Auxiliar</option>
                      <option value="Supervisora">Supervisora</option>
                      <option value="Jefe de Proyectos">Jefe de Proyectos</option>
                      <option value="Soporte">Soporte</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Estado Usuario</label>
                    <select className="form-control">
                      <option value="">Selecciona un estado...</option>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                      <option value="BLOQUEADO">BLOQUEADO</option>
                      <option value="SUSPENDIDO">SUSPENDIDO</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- CAMBIO: Modal para editar usuario --- */}
        {showEditModal && editUsuario && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal">
              <h5 className="modal-title">Editar Usuario</h5>
              <form>
                <div className="crear-conductor-form">
                  <div className="mb-2">
                    <label className="form-label">Documento de Identidad</label>
                    <input className="form-control" defaultValue={editUsuario.documentoIdentidad} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Nombre Completo</label>
                    <input className="form-control" defaultValue={editUsuario.nombreCompleto} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input className="form-control" defaultValue={editUsuario.email} type="email" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Número de Contacto</label>
                    <input className="form-control" defaultValue={editUsuario.numContacto} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Dirección de Residencia</label>
                    <input className="form-control" defaultValue={editUsuario.direccionResidencia} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Rol</label>
                    <select className="form-control" defaultValue={editUsuario.role}>
                      <option value="">Selecciona un rol...</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Manager">Manager</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Conductor">Conductor</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Puesto</label>
                    <select className="form-control" defaultValue={editUsuario.puesto}>
                      <option value="">Selecciona un puesto...</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Analista">Analista</option>
                      <option value="Jefe de Área">Jefe de Área</option>
                      <option value="Conductor">Conductor</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Gerente">Gerente</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Asistente">Asistente</option>
                      <option value="Recepcionista">Recepcionista</option>
                      <option value="Auxiliar">Auxiliar</option>
                      <option value="Supervisora">Supervisora</option>
                      <option value="Jefe de Proyectos">Jefe de Proyectos</option>
                      <option value="Soporte">Soporte</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Estado Usuario</label>
                    <select className="form-control" defaultValue={editUsuario.estado}>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                      <option value="BLOQUEADO">BLOQUEADO</option>
                      <option value="SUSPENDIDO">SUSPENDIDO</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowEditModal(false)}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- CAMBIO: Modal para eliminar usuario --- */}
        {showDeleteModal && selectedUsuario && (
          <div className="crear-conductor-modal-bg">
            <div className="crear-conductor-modal" style={{ maxWidth: 380 }}>
              <h5 className="modal-title mb-3 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirmar Eliminación
              </h5>
              <div className="mb-3">
                ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;