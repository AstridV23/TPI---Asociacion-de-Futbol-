import { useEffect, useState } from "react";
import { Box, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/AuthContext";
import {  toast } from 'react-toastify';

function Jugador() {
    const [equipos, setEquipos] = useState([]);
    const api = useAxios();
    const { dni } = useAuth();
    
    const {
        reset,
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        const fetchEquipos = async () => {
            const dni_jugador = dni; 
            try {
                const response = await api.get(`equipos_compatibles`, {
                    params: { dni_jugador } 
                });
                setEquipos(response.data);
                if(response.data.length<1) toast.error("No hay equipos compatibles con tu edad") // Setea los equipos si no hay error
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("No existen equipos correspondientes para tu edad.");
                } else {
                    console.error("Error al cargar equipos:", error);
                }
            }
        };
    
        fetchEquipos();
    }, [dni]); // Asegúrate de que se ejecute cuando cambie el DNI
    

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            DNI_Jugador: dni,
            Nro_Socio: parseInt(data.Nro_Socio),
            Nro_Equipo: parseInt(data.Nro_Equipo),
            Telefono: data.Telefono
        };

        try {
            console.log(formData);
            const response = await api.post("registrar_jugador", formData);
            if (response.status === 201 || response.status === 200) {
                toast.success("Solicitud enviada correctamente!");
                reset();
            }
        } catch (error) {
            setError("root", {
                message: "Error al registrar jugador"
            });
            console.error("Error al registrar al jugador:", error);
            toast.error("Ocurrio un poprblema")
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
                Registro de Jugador
            </h1>

            <Controller
                name="Nro_Equipo"
                control={control}
                rules={{ required: "Equipo es necesario" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.Nro_equipo}>
                        <InputLabel>Equipo</InputLabel>
                        <Select
                            {...field} // Esto conecta el campo con el controlador de react-hook-form
                            label="Equipo"
                            defaultValue={field.value} // Asegura que el valor seleccionado sea el valor del equipo
                        >
                            {equipos.map((equipo) => (
                                <MenuItem key={equipo.Nro_Equipo} value={equipo.Nro_Equipo}>
                                    {`${equipo.Nombre} (Equipo ${equipo.Nro_Equipo})`}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.Nro_Equipo && (
                            <span style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}>
                                {errors.Nro_equipo.message}
                            </span>
                        )}
                    </FormControl>
                )}
            />

            <TextField
                {...register("Nro_Socio", { 
                    required: "Número de socio es necesario",
                    pattern: {
                        value: /^\d+$/,
                        message: "Solo números permitidos"
                    }
                })}
                fullWidth
                label="Número de Socio"
                variant="outlined"
                type="number"
                error={!!errors.Nro_Socio}
                helperText={errors.Nro_Socio?.message}
            />

            <TextField
                {...register("Telefono", { 
                    required: "Teléfono es necesario",
                    pattern: {
                        value: /^\d+$/,
                        message: "Solo números permitidos"
                    }
                })}
                fullWidth
                label="Teléfono"
                variant="outlined"
                type="tel"
                error={!!errors.Telefono}
                helperText={errors.Telefono?.message}
            />

            <Button
                variant="contained"
                component="label"
            >
                Subir Foto
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    {...register("Foto")}
                />
            </Button>

            {errors.root && (
                <Typography color="error" textAlign="center">
                    {errors.root.message}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registrando..." : "Registrar Jugador"}
            </Button>
        </Box>
    );
}

export default Jugador; 