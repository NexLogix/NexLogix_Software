// src/components/HomeManager.tsx
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileController } from '../../../../Controllers/Users/UserController';
import { UserProfile } from './../../../../models/Interfaces/UserProfile';

const HomeManager = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await UserProfileController();
                // La respuesta tiene la estructura { success: true, message: "Bienvenido !", Data: {...} }
                if (response.data.success) {
                    setProfile(response.data.Data);
                } else {
                    setError('No se pudo cargar el perfil');
                }
            } catch (err) {
                setError('No se pudo cargar el perfil');
                if (err instanceof Error && err.message === 'No autenticado') {
                    navigate('/login');
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    if (!profile && !error) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5">
                {error && <div className="alert alert-danger">{error}</div>}
                {profile ? (
                    <div className="card shadow-lg mx-auto" style={{ maxWidth: '700px', maxHeight: '900px'}}>
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Bienvenid@ a <strong>NEXLOGIX</strong></h3>
                        </div>
                        <div className="card-body">
                            <h5>Información del EMPLEADO:</h5>
                            <br />
                            <p><strong>ID usuario:</strong> {profile.idusuarios}</p>
                            <p><strong>Cedula de Cuidadania:</strong> {profile.documentoIdentidad}</p>
                            <p><strong>Nombre completo:</strong> {profile.nombreCompleto}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Teléfono:</strong> {profile.numContacto}</p>
                            <p><strong>Dirección:</strong> {profile.direccionResidencia}</p>
                            <p><strong>Fecha de Creación:</strong> {new Date(profile.fechaCreacion).toLocaleDateString()}</p>
                            <p><strong>Role:</strong> MANAGER</p>
                        </div>
                    </div>
                ) : (
                    <h1>Bienvenido a NexLogix Manager</h1>
                )}
                
            </div>
        </>
    );
};

export default HomeManager;