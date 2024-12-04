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

  const [mensaje, setMensaje]= useState();
  const [divisiones, setDivisiones] = useState([]);

  const fetchDivision = async () => {
    try {
      const response = await api.get(`divisiones`);
      if (response.status === 200) {
        setDivisiones(response.data);
      }
    } catch (error) {
      console.error('Error al obtener las divisiones:', error);
    }
  };

  useEffect(() => {
    fetchDivision();
  }, []);

  const onSubmit = async (data) => {
    try{
      const response = await api.post(`equipo/${dni}`, data)
      if (response.status === 200){
          setMensaje(response.message)
      }
    }catch (error){
      console.log(error)

    }
    
  };
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem', mb: 3 }}>
          Añadir Equipo
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              select
              label="División"
              fullWidth
              defaultValue=""
              slotProps={{
                inputLabel: { shrink: true }
              }}
              {...register('Division_id', { required: 'Debe seleccionar una división' })}
              error={!!errors.Division_id}
              helperText={errors.Division_id?.message}
            >
              <option value="">Seleccione una división</option>
              {divisiones.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.Tipo}
                </option>
              ))}
            </TextField>

            <TextField
              label="Nombre del director tecnico"
              fullWidth
              {...register('Director_Tecnico', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre_Director}
              helperText={errors.Nombre_Director?.message}
            />
            
            <TextField
              label="Nombre del equipo"
              fullWidth
              {...register('Nombre', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre}
              helperText={errors.Nombre?.message}
            />

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
