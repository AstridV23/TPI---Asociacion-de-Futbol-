import React, {useState, useEffect} from 'react'
import { useAuth } from '../hooks/AuthContext';
import useAxios from '../hooks/useAxios';
import CardJugador from '../componentes/CardJugador'; 
import { Box, Typography, Container } from '@mui/material';

function ConfEquipo() {
    const {dni} = useAuth();
    const api = useAxios();

    const [jugadores, setJugadores] = useState([]);
    const [existe, setExiste] = useState();

    useEffect(() => {
        traerJugadores();
    }, []);

    const traerJugadores = async () => {
        try {
            const response = await api.get(`equipo_jugadores`, {
                params: { dni_representante: dni } // DNI se pasa como query param
            });
            
            if (response.status === 200) {
                setJugadores(response.data);
                setExiste(true);
            } else if (response.status === 404) {
                setExiste(false);
            }
        } catch(error) {
            console.error('Error al obtener jugadores:', error);
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                {existe === false ? (
                    <Typography 
                        variant="h5" 
                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                    >
                        Usted no es el representante de ningún equipo
                    </Typography>
                ) : existe && jugadores.length === 0 ? (
                    <Typography 
                        variant="h5" 
                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                    >
                        No hay jugadores inscriptos para tu equipo
                    </Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {jugadores.map((jugador) => (
                            <CardJugador
                                key={jugador.Dni_Jugador}
                                Apellido={jugador.Apellido}
                                Nombre={jugador.Nombre}
                                Dni_Jugador={jugador.Dni_Jugador}
                                Nro_socio={jugador.Nro_socio}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default ConfEquipo;