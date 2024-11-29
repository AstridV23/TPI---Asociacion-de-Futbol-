import React from "react";
import { Box, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function Registro() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        watch,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            Rol: '',
            FechaNacimiento: ''
        }
    });

    const api = useAxios();
    

    const passwordValue = watch("Contrasena");

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            FechaNacimiento: data.FechaNacimiento
        };

        const { confirmPassword, ...formData } = transformedData;

        try {
            const response = await api.post("register_persona", formData);

            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            if (!error?.response) {
                setError("root", {
                    message: "Error al intentar conectarse con el servidor",
                });
            } else {
                setError("root", {
                    message: "Error inesperado durante el registro",
                });
            }
        }
    };

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
                Regístrate
            </h1>

            <TextField
                {...register("DNI", { required: "DNI es necesario" })}
                fullWidth
                label="DNI"
                variant="outlined"
                error={!!errors.DNI}
                helperText={errors.DNI?.message}
            />

            <TextField
                {...register("Nombre", { required: "Nombre es necesario" })}
                fullWidth
                label="Nombre"
                variant="outlined"
                error={!!errors.Nombre}
                helperText={errors.Nombre?.message}
            />

            <TextField
                {...register("Apellido", { required: "Apellido es necesario" })}
                fullWidth
                label="Apellido"
                variant="outlined"
                error={!!errors.Apellido}
                helperText={errors.Apellido?.message}
            />

            <TextField
                {...register("Direccion", { required: "Dirección es necesaria" })}
                fullWidth
                label="Dirección"
                variant="outlined"
                error={!!errors.Direccion}
                helperText={errors.Direccion?.message}
            />

            <TextField
                type="date"
                {...register("FechaNacimiento", { required: "Fecha de nacimiento es necesaria" })}
                fullWidth
                variant="outlined"
                error={!!errors.FechaNacimiento}
                helperText={errors.FechaNacimiento?.message}
            />

            <Controller
                name="Rol"
                control={control}
                rules={{ required: "Rol es necesario" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.Rol}>
                        <InputLabel>Rol</InputLabel>
                        <Select {...field} label="Rol">
                            <MenuItem value="persona">Encargado</MenuItem>
                            <MenuItem value="jugador">Jugador</MenuItem>
                        </Select>
                        {errors.Rol && (
                            <span style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}>
                                {errors.Rol.message}
                            </span>
                        )}
                    </FormControl>
                )}
            />

            <TextField
                {...register("Contrasena", {
                    required: "Contraseña es necesaria",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[\w\W]{8,16}$/,
                        message: "Debe tener entre 8 y 16 caracteres, al menos una letra y un número"
                    }
                })}
                fullWidth
                type="password"
                label="Contraseña"
                variant="outlined"
                error={!!errors.Contrasena}
                helperText={errors.Contrasena?.message}
            />

            <TextField
                {...register("confirmPassword", {
                    required: "Confirme su contraseña",
                    validate: value => value === passwordValue || "Las contraseñas no coinciden"
                })}
                fullWidth
                type="password"
                label="Confirmar contraseña"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            {errors.root && (
                <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
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
                {isSubmitting ? "Guardando..." : "Registrar"}
            </button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    ¿Ya tienes una cuenta?
                </Typography>
                <Button
                    variant="text"
                    onClick={() => navigate('/')}
                    sx={{ mt: 1 }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Box>
    );
}

export default Registro;
