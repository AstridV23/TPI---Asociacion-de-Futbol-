// src/components/Equipo.jsx
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'; 
import { 
  TextField, Button, Box, Paper, Typography,
  Select, FormControl, InputLabel,
  MenuItem, FormHelperText
} from '@mui/material';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';
import { toast } from 'react-toastify';

function Equipo() {
  const { reset, register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const api = useAxios();
  const {dni} = useAuth();

  const [mensaje, setMensaje]= useState();
  const [divisiones, setDivisiones] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');

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

  const handleDivisionChange = (event) => {
    const value = event.target.value;
    setSelectedDivision(value);
    setValue('Division_id', value); // Esto registrará el valor en el formulario
  };

  const onSubmit = async (data) => {
    const formData = {
      Nombre: data.Nombre,
      DT: data.Director_Tecnico,
      Division_Id: parseInt(selectedDivision),
      DNI_Representante: dni
  };
    try{

      const response = await api.post(`equipo`, formData)
      if (response.status === 200 || response.status === 201){
          toast.success("Se creo el equipo correctamente!");
          reset();
      }
    }catch (error){
      console.log(error)
      toast.error("No se pudo crear al equipo")

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
            <FormControl fullWidth error={!!errors.Division_id}>
              <InputLabel>División</InputLabel>
              <Select
                label="División"
                value={selectedDivision}
                onChange={handleDivisionChange}
              >
                <MenuItem value="">Seleccione una división</MenuItem>
                {divisiones.map((division) => (
                  <MenuItem key={division.Division_Id} value={division.Division_Id}>
                    {division.Tipo}
                  </MenuItem>
                ))}
              </Select>
              {errors.Division_id && (
                <FormHelperText>{errors.Division_id.message}</FormHelperText>
              )}
            </FormControl>

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
