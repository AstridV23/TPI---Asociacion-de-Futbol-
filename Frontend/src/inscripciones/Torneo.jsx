import { useForm } from 'react-hook-form';
import { 
  TextField, Button, Box, Paper, Typography, Select, MenuItem, FormHelperText, InputLabel, FormControl
} from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';

function Torneo() {
  const { register: registerTorneo, handleSubmit: handleSubmitTorneo, formState: { errors: errorsTorneo } } = useForm();
  const { register: registerCategoria, handleSubmit: handleSubmitCategoria, formState: { errors: errorsCategoria } } = useForm();
  
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const {dni} = useAuth();

  const api = useAxios();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategorias = async () => {
      setLoadingCategorias(true);
      try {
        const response = await api.get("categoria");
        setCategorias(response.data || []);
      } catch (error) {
        console.error("Error al traer las categorías:", error);
      } finally {
        setLoadingCategorias(false);
      }
    };

    fetchCategorias();
  }, [categorias]);

  const onSubmitTorneo = async (data) => {
    
    const dataCompleta={...data, DNI_Encargado:dni}
    if (!categorias.length) {
      alert("No hay categorías disponibles, no se puede crear el torneo.");
      return;
    }
    const response = await api.post("torneo", dataCompleta);
    // Aquí irá la lógica para enviar los datos del torneo al backend
  };

  const onSubmitCategoria = async (data) => {
    try {
      const response = await api.post("categoria", data);
      console.log("Categoría creada:", response.data);
      setCategorias([...categorias, response.data]);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
        p: 2,
      }}
    >
      {/* Formulario de torneo */}
      <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
        <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem', mb: 3 }}>
          Añadir Torneo
        </Typography>
        <form onSubmit={handleSubmitTorneo(onSubmitTorneo)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre del Torneo"
              fullWidth
              {...registerTorneo('Nombre', { required: 'Este campo es requerido' })}
              error={!!errorsTorneo.Nombre}
              helperText={errorsTorneo.Nombre?.message}
            />

            <FormControl fullWidth error={!!errorsTorneo.Fecha_Inicio}>
              <InputLabel shrink>Fecha de inicio</InputLabel>
              <TextField
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...registerTorneo('Fecha_Inicio', { required: 'Este campo es requerido' })}
                error={!!errorsTorneo.Fecha_Inicio}
                helperText={errorsTorneo.Fecha_Inicio?.message}
              />
            </FormControl>

            <FormControl fullWidth error={!!errorsTorneo.Fecha_Fin}>
              <InputLabel shrink>Fecha de finalización</InputLabel>
              <TextField
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...registerTorneo('Fecha_Fin', { required: 'Este campo es requerido' })}
                error={!!errorsTorneo.Fecha_Fin}
                helperText={errorsTorneo.Fecha_Fin?.message}
              />
            </FormControl>

            <FormControl fullWidth error={!!errorsTorneo.Fecha_Inicio_Inscripcion}>
              <InputLabel shrink>Fecha inicio de inscripción</InputLabel>
              <TextField
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...registerTorneo('Fecha_Inicio_Inscripcion', { required: 'Este campo es requerido' })}
                error={!!errorsTorneo.Fecha_Inicio_Inscripcion}
                helperText={errorsTorneo.Fecha_Inicio_Inscripcion?.message}
              />
            </FormControl>

            <FormControl fullWidth error={!!errorsTorneo.Fecha_Fin_Inscripcion}>
              <InputLabel shrink>Fecha fin de inscripción</InputLabel>
              <TextField
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...registerTorneo('Fecha_Fin_Inscripcion', { required: 'Este campo es requerido' })}
                error={!!errorsTorneo.Fecha_Fin_Inscripcion}
                helperText={errorsTorneo.Fecha_Fin_Inscripcion?.message}
              />
            </FormControl>

            {/*<FormControl fullWidth error={!!errorsTorneo.Categoria}>
              <InputLabel>Categoría</InputLabel>
              <Select
                {...registerTorneo('Categoria', { required: 'Debe seleccionar una categoría' })}
                defaultValue=""
                disabled={loadingCategorias || categorias.length === 0}
              >
                {categorias.length === 0 ? (
                  <MenuItem value="" disabled>No hay categorías disponibles</MenuItem>
                ) : (
                  categorias.map((cat) => (
                    <MenuItem key={cat.id} value={cat.Tipo}>{cat.Tipo}</MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText>
                {errorsTorneo.Categoria?.message}
              </FormHelperText>
            </FormControl>*/}

            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              disabled={categorias.length === 0}
            >
              Crear Torneo
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Formulario de categoría */}
      {/* <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
        <Typography variant="h1" align="center" sx={{ fontSize: '1.5rem', mb: 3 }}>
          Añadir una Categoría
        </Typography>
        <form onSubmit={handleSubmitCategoria(onSubmitCategoria)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Tipo"
              fullWidth
              {...registerCategoria('Tipo', { required: 'Este campo es requerido' })}
              error={!!errorsCategoria.Tipo}
              helperText={errorsCategoria.Tipo?.message}
            />

            <TextField
              label="Descripción"
              fullWidth
              {...registerCategoria('Descripcion', { required: 'Este campo es requerido' })}
              error={!!errorsCategoria.Descripcion}
              helperText={errorsCategoria.Descripcion?.message}
            />

            <TextField
              type="number"
              label="Edad Mínima"
              fullWidth
              {...registerCategoria('Edad_Min', { required: 'Este campo es requerido' })}
              error={!!errorsCategoria.Edad_Min}
              helperText={errorsCategoria.Edad_Min?.message}
            />

            <TextField
              type="number"
              label="Edad Máxima"
              fullWidth
              {...registerCategoria('Edad_Max', { required: 'Este campo es requerido' })}
              error={!!errorsCategoria.Edad_Max}
              helperText={errorsCategoria.Edad_Max?.message}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              size="large"
            >
              Crear Categoría
            </Button>
          </Box>
        </form>
      </Paper> */}
    </Box>
  );
}

export default Torneo;