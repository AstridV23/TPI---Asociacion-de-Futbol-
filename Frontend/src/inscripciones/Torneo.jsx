import { useForm } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Box, 
  Paper,
  Typography
} from '@mui/material';

function Torneo() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí irá la lógica para enviar los datos al backend
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Crear Nuevo Torneo
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre del Torneo"
              fullWidth
              {...register('nombreTorneo', { required: 'Este campo es requerido' })}
              error={!!errors.nombreTorneo}
              helperText={errors.nombreTorneo?.message}
            />

            <TextField
              type="date"
              label="Fecha inicio inscripción"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('fechaInicioInscripcion', { required: 'Este campo es requerido' })}
              error={!!errors.fechaInicioInscripcion}
              helperText={errors.fechaInicioInscripcion?.message}
            />

            <TextField
              type="date"
              label="Fecha fin inscripción"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('fechaFinInscripcion', { required: 'Este campo es requerido' })}
              error={!!errors.fechaFinInscripcion}
              helperText={errors.fechaFinInscripcion?.message}
            />

            <TextField
              type="date"
              label="Fecha inicio torneo"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('fechaInicioTorneo', { required: 'Este campo es requerido' })}
              error={!!errors.fechaInicioTorneo}
              helperText={errors.fechaInicioTorneo?.message}
            />

            <TextField
              type="date"
              label="Fecha fin torneo"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('fechaFinTorneo', { required: 'Este campo es requerido' })}
              error={!!errors.fechaFinTorneo}
              helperText={errors.fechaFinTorneo?.message}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Crear Torneo
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Torneo;