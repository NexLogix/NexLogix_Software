import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUseCase } from '../../UseCases/Auth/AuthUseCase';

export const useAuthLoginController = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useLoginUseCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("[useAuthLoginController] Formulario enviado:", { email, contrasena });
    try {
      await login(email, contrasena, navigate);
      console.log("[useAuthLoginController] Login ejecutado con éxito");
    } catch (err) {
      console.error("[useAuthLoginController] Error en handleSubmit:", err);
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return {
    email,
    setEmail,
    contrasena,
    setContrasena,
    error,
    handleSubmit,
  };
};