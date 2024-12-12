import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Button, Card, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

function CardJugador({ Apellido, Nombre, Dni_Jugador, Nro_socio }) {
    const [eliminado, setEliminado] = useState(false);
    const api = useAxios();

    const eliminar = async () => {
        try {
            const dataJugador = {
                DNI_Jugador: parseInt(Dni_Jugador),
                Nro_Socio: parseInt(Nro_socio)
            };

            console.log(dataJugador)

            const response = await api.post('confirmar_jugador', JSON.stringify(dataJugador));
            console.log(response)

            if (response.status === 200 || response.status === 201 ) {
                setEliminado(true);
                toast.success("Jugador rechazado correctamente")
            }
        } catch (error) {
            console.error('Error al eliminar jugador:', error);
            toast.error("Error al eliminar jugador")
        }
    }

    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                mb: 1,
                opacity: eliminado ? 0.5 : 1,
                border: '1px solid #ccc'
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {!eliminado && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={eliminar}
                        sx={{ minWidth: '100px' }}
                    >
                        Rechazar
                    </Button>
                )}
                <Typography variant="h6">
                    {`${Apellido} ${Nombre}`}
                </Typography>
            </Box>
            <Typography variant="h6">
                N° Socio: {Nro_socio}
            </Typography>
        </Card>
    );
}

export default CardJugador;