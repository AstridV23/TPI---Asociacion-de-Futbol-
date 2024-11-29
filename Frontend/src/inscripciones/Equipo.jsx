// src/components/Equipo.jsx
import { useForm } from 'react-hook-form';
import { 
  TextField, Button, Box, Paper, Typography 
} from '@mui/material';

function Equipo() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Lógica del submit se implementará más tarde
    console.log("Datos del equipo:", data);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem', mb: 3 }}>
          Añadir Equipo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre del Director"
              fullWidth
              {...register('Nombre_Director', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre_Director}
              helperText={errors.Nombre_Director?.message}
            />

            <TextField
              label="Número del Equipo"
              type="number"
              fullWidth
              {...register('Nro_Equipo', { 
                required: 'Este campo es requerido', 
                min: { value: 1, message: 'Debe ser un número mayor a 0' } 
              })}
              error={!!errors.Nro_Equipo}
              helperText={errors.Nro_Equipo?.message}
            />

            <TextField
              label="Nombre del Equipo"
              fullWidth
              {...register('Nombre', { required: 'Este campo es requerido' })}
              error={!!errors.Nombre}
              helperText={errors.Nombre?.message}
            />

            <TextField
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
