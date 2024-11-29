import React from "react";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function Inicio() {
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm();

    const { login} = useAuth();


    const onSubmit = async (data) => {
        // Aquí irá la lógica de inicio de sesión
        try {
            //const response = await axios.post("/api/auth/login", data);
            
            // Chequear si la estructura de la respuesta es la esperada
            if (response.status === 200 && response.data) {
              const { accessToken, usuarioLogueado } = response.data;
              const idRole = usuarioLogueado.roles[0].idRole;
              const idUsuario = usuarioLogueado.idUsuario;
  
              // Guarda el token y el rol en el contexto usando el hook useAuth
              login(accessToken, idRole, idUsuario);
              
            
            } else {
              throw new Error('Respuesta inesperada del servidor');
            }
        
          } catch (error) {
            // Verifica si el error es de red o falta de respuesta
            if (!error?.response) {
              setError("root", {
                message: "Error al intentar conectarse con el servidor",
              });
            }
            else {
              // Muestra el error inesperado durante la autenticación
              setError("root", {
                message: "Error inesperado durante el inicio de sesión",
              });
            }
          }
    }

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '500px',
                margin: 'auto',
                padding: 2
            }}
        >
            <h1 style={{ textAlign: 'center', color: 'black', margin: '0 0 20px 0' }}>
                Inicia Sesión
            </h1>

            <TextField 
                {...register("dni", { required: "DNI es necesario" })}
                fullWidth
                label="DNI" 
                variant="outlined"
                error={!!errors.dni}
                helperText={errors.dni?.message}
            />

            <TextField 
                {...register("password", { required: "Contraseña es necesaria" })}
                fullWidth
                type="password"
                label="Contraseña" 
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            {errors.root && (
                <div style={{color: 'red', textAlign: 'center', margin: '10px 0'}}>
                    {errors.root.message}
                </div>
            )}
            
            <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                }}
            >
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </button>
        </Box>
    );
}

export default Inicio;