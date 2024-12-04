import React, { useEffect, useState } from "react";
import { Box, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/AuthContext";

function Jugador() {
    const [equipos, setEquipos] = useState([]);
    const api = useAxios();
    const { dni } = useAuth();
    
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await api.get("traerEquipos");
                setEquipos(response.data);
            } catch (error) {
                console.error("Error al cargar equipos:", error);
            }
        };
        fetchEquipos();
    }, []);

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            DNI_Jugador: dni,
            Nro_Socio: parseInt(data.Nro_Socio),
            Nro_equipo: parseInt(data.Nro_equipo),
            Telefono: parseInt(data.Telefono)
        };

        try {
            const response = await api.post("registrar_jugador", formData);
            if (response.status === 201 || response.status === 200) {
                // Manejar éxito
                console.log("Jugador registrado exitosamente");
            }
        } catch (error) {
            setError("root", {
                message: "Error al registrar jugador"
            });
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
                name="Nro_equipo"
                control={control}
                rules={{ required: "Equipo es necesario" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.Nro_equipo}>
                        <InputLabel>Equipo</InputLabel>
                        <Select {...field} label="Equipo">
                            {equipos.map((equipo) => (
                                <MenuItem key={equipo.Nro_equipo} value={equipo.Nro_equipo}>
                                    {`${equipo.Nombre} (Equipo ${equipo.Nro_equipo})`}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.Nro_equipo && (
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