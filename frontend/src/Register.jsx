import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ nombre: '', correo: '', password: '', rol: 'alumno' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Cuenta creada con éxito. Ahora inicia sesión.");
            navigate('/login');
        } else {
            alert("Error al crear cuenta");
        }
    };

    return (
        <div className="login-screen">
            <div className="login-box">
                <h2 style={{color: '#E85D34'}}>Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <input name="nombre" placeholder="Nombre completo" onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                    <input name="correo" type="email" placeholder="Correo @uni.edu.pe" onChange={(e) => setFormData({...formData, correo: e.target.value})} required />
                    <input name="password" type="password" placeholder="Contraseña" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    
                    <select className="input-orange" onChange={(e) => setFormData({...formData, rol: e.target.value})}>
                        <option value="alumno">Soy Estudiante</option>
                        <option value="admin">Soy Dueño de Restaurante</option>
                    </select>

                    <button type="submit" className="btn-orange">Registrarse</button>
                </form>
                <p onClick={() => navigate('/login')} style={{cursor: 'pointer', marginTop: '10px'}}>¿Ya tienes cuenta? Inicia sesión</p>
            </div>
        </div>
    );
};

export default Register;