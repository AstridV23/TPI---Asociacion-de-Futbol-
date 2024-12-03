// src/components/Equipo.jsx
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { 
  TextField, Button, Box, Paper, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Radio, FormControlLabel, RadioGroup 
} from '@mui/material';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';

function Equipo() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const api = useAxios();
  const {dni} = useAuth();

  const [idTorneo, setIdTorneo] = useState();
  const [mensaje, setMensaje]= useState();
  const [torneos, setTorneos] = useState([]);

  const fetchTorneos = async () => {
    try {
      const response = await api.get(`torneos`);
      if (response.status === 200) {
        setTorneos(response.data);
      }
    } catch (error) {
      console.error('Error al obtener torneos:', error);
    }
  };

  useEffect(() => {
    fetchTorneos();
  }, []);

  const onSubmit = async (data) => {
    try{
      const response = await api.post(`equipo/${idTorneo}/${dni}`, data)
      if (response.status === 200){
          setMensaje(response.message)
      }
    }catch (error){
      

    }
    
  };





  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem', mb: 3 }}>
          Añadir Equipo
        </Typography>

        <Typography variant="h2" sx={{ fontSize: '1.2rem', mb: 2 }}>
          Torneos Disponibles
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seleccionar</TableCell>
                <TableCell>Información del Torneo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RadioGroup
                value={idTorneo}
                onChange={(e) => setIdTorneo(e.target.value)}
              >
                {torneos.map((torneo) => (
                  <TableRow key={torneo.id}>
                    <TableCell>
                      <FormControlLabel
                        value={torneo.id}
                        control={<Radio />}
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      {`${torneo.Nombre} - Categoría: ${torneo.Categoria} - División: ${torneo.Division} - 
                        Desde: ${new Date(torneo.Fecha_Inicio).toLocaleDateString()} 
                        Hasta: ${new Date(torneo.Fecha_Fin).toLocaleDateString()}`}
                    </TableCell>
                  </TableRow>
                ))}
              </RadioGroup>
            </TableBody>
          </Table>
        </TableContainer>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre del director tecnico"
              fullWidth
              {...register('Director_Tecnico', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre_Director}
              helperText={errors.Nombre_Director?.message}
            />

            {/* <TextField
              label="Número del Equipo"
              type="number"
              fullWidth
              {...register('Nro_Equipo', { 
                required: 'Este campo es requerido', 
                min: { value: 1, message: 'Debe ser un número mayor a 0' } 
              })}
              error={!!errors.Nro_Equipo}
              helperText={errors.Nro_Equipo?.message}
            /> */}

            <TextField
              label="Nombre del equipo"
              fullWidth
              {...register('Nombre', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre}
              helperText={errors.Nombre?.message}
            />

            {/* <TextField
              label="DNI del Representante"
              type="number"
              fullWidth
              {...register('DNI_Representante', { 
                required: 'Este campo es requerido', 
                minLength: { value: 8, message: 'Debe tener al menos 8 dígitos' }, 
                maxLength: { value: 8, message: 'Debe tener como máximo 8 dígitos' } 
              })}
              error={!!errors.DNI_Representante}
              helperText={errors.DNI_Representante?.message}
            /> */}

            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Crear Equipo
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Equipo;
