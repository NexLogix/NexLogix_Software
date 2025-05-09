import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBuscarUsuario from "../../componets/NavBars/NavBuscarUsuario";

interface Vehiculo {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  tipo: string;
  capacidad: string;
  estado: string;
  ultimoMantenimiento: string;
  conductorAsignado: string;
}

const VerListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const navigate = useNavigate();

  // Simulación de carga de datos
  useEffect(() => {
    const fetchVehiculos = async () => {
      // Simulación de API call
      setTimeout(() => {
        const data: Vehiculo[] = [
          {
            id: 1,
            placa: "ABC123",
            marca: "Toyota",
            modelo: "Hilux",
            tipo: "Camioneta",
            capacidad: "1 Tonelada",
            estado: "Disponible",
            ultimoMantenimiento: "2023-05-15",
            conductorAsignado: "Juan Pérez"
          },
          {
            id: 2,
            placa: "XYZ789",
            marca: "Mercedes-Benz",
            modelo: "Sprinter",
            tipo: "Furgón",
            capacidad: "3 Toneladas",
            estado: "En mantenimiento",
            ultimoMantenimiento: "2023-04-20",
            conductorAsignado: "Carlos Gómez"
          },
          {
            id: 3,
            placa: "DEF456",
            marca: "Ford",
            modelo: "F-150",
            tipo: "Camión",
            capacidad: "2.5 Toneladas",
            estado: "En ruta",
            ultimoMantenimiento: "2023-06-01",
            conductorAsignado: "María Rodríguez"
          }
        ];
        setVehiculos(data);
      }, 500);
    };

    fetchVehiculos();
  }, []);

  const filteredVehicles = vehiculos.filter(vehicle =>
    Object.values(vehicle).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (id: number) => {
    navigate(`/manager/editarVehiculo/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedVehicle(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      setVehiculos(vehiculos.filter(vehicle => vehicle.id !== selectedVehicle));
      setShowDeleteModal(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch(estado) {
      case "Disponible":
        return "bg-success";
      case "En ruta":
        return "bg-primary";
      case "En mantenimiento":
        return "bg-warning";
      case "Inactivo":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <NavBuscarUsuario />
      <div className="container-fluid px-4 py-5">
        <div className="card border-0 shadow">
          <div className="card-header bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Gestión de Vehículos</h2>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar vehículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className="btn btn-light"
                  onClick={() => navigate("/manager/crearVehiculo")}
                >
                  <i className="bi bi-plus-lg"></i> Nuevo
                </button>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Marca/Modelo</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Capacidad</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Último Mantenimiento</th>
                    <th scope="col">Conductor</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>
                          <span className="fw-semibold">{vehicle.placa}</span>
                        </td>
                        <td>
                          <div className="fw-semibold">{vehicle.marca}</div>
                          <div className="text-muted small">{vehicle.modelo}</div>
                        </td>
                        <td>{vehicle.tipo}</td>
                        <td>{vehicle.capacidad}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(vehicle.estado)}`}>
                            {vehicle.estado}
                          </span>
                        </td>
                        <td>{new Date(vehicle.ultimoMantenimiento).toLocaleDateString()}</td>
                        <td>{vehicle.conductorAsignado}</td>
                        <td className="text-end">
                          <div className="d-flex gap-2 justify-content-end">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(vehicle.id)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteClick(vehicle.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-4">
                        <div className="text-muted">No se encontraron vehículos</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <div className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro que deseas eliminar este vehículo? Esta acción no se puede deshacer.
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
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerListaVehiculos;