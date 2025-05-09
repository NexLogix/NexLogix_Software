import AppRouter from "./Routers/AppRouter";
import { setAuthHeader } from './services/Auth/AuthService';
import { useEffect } from "react";

function App() {
    useEffect(() => {
        setAuthHeader(); // Establece encabezado por defecto si hay token
    }, []);

    return <AppRouter />;
}

export default App;
