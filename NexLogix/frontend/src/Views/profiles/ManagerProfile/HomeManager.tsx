import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileController } from '../../../Controllers/Users/UserController';
import { UserProfile } from '../../../models/Interfaces/UserProfile';
import axios from 'axios';
import './../../Styles/Profiles/HomeStyle.css';

const HomeManager = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile...');
        const response = await UserProfileController();
        console.log('Response:', response.data);
        if (response.data.success) {
          setProfile(response.data.Data);
        } else {
          setError('No se pudo cargar el perfil');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const message = err.response?.data?.message || 'No se pudo cargar el perfil';
          console.error('Error response:', err.response?.data);
          console.error('Status:', status);
          setError(`Error ${status}: ${message}`);
          if (status === 401) {
            navigate('/');
          }
        } else {
          setError('Error desconocido al cargar el perfil');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!profile && !error) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="spinner-border text-primary mb-4" style={{ width: 60, height: 60 }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div className="loading-message">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="home_manager_container">
      <div className="container pt-0" style={{ paddingTop: 0, marginTop: 0 }}>
        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4 animate__animated animate__fadeIn" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{error}</div>
          </div>
        )}
        {profile ? (
          <div className=" border-0 animate__animated animate__fadeInUp">

            <div className="card-header rounded-lg text-white text-center py-4 ">
              <h1 className="mb-0 display-4 fw-bold">
                Bienvenid@ a <span className="text-warning">NEXLOGIX</span>
              </h1>
              <p className="mt-2 text-light">Tu solución integral para logística</p>
            </div>

            <div className="card-body p-5">
              <h4 className="mb-4 text-primary fw-bold">Información del Empleado</h4>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>ID usuario:</strong>
                      <span className="badge bg-primary text-white rounded-pill">{profile.ID}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Cédula de Ciudadanía:</strong>
                      <span>{profile.documentoIdentidad}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Nombre completo:</strong>
                      <span>{profile.nombreCompleto}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Email:</strong>
                      <span>{profile.email}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Teléfono:</strong>
                      <span>{profile.numContacto}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Dirección:</strong>
                      <span>{profile.direccionResidencia}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <strong>Fecha de Creación de la cuenta:</strong>
                      <span>{new Date(profile.fechaCreacion).toLocaleDateString()}</span>
                    </li>
                  </ul>
                </div>
              </div>

              
              <hr className="my-4" />
              <h5 className="mb-3 text-primary">Detalles del Rol</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item py-3">
                  <strong>Rol:</strong> {profile.Role?.nombreRole}
                  <div className="mt-2">
                    <strong>Descripción:</strong> {profile.Role?.descripcionRole}
                  </div>
                  <div>
                    <strong>Fecha Asignación:</strong> {profile.Role?.fechaAsignacionDelRole}
                  </div>
                </li>
                <li className="list-group-item py-3">
                  <strong>Puesto:</strong> {profile.Puesto?.nombrePuesto}
                  <div className="mt-2">
                    <strong>Descripción:</strong> {profile.Puesto?.descripcionPuesto}
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">NEXLOGIX - Optimizando tu logística</small>
            </div>
          </div>
        ) : (
          !error && (
            <div className="welcome-text">
              <h1 className="display-4 fw-bold text-primary">Bienvenido a <span className="text-warning">NexLogix Manager</span></h1>
              <p className="lead text-muted">Gestiona tu logística con eficiencia y precisión</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomeManager;