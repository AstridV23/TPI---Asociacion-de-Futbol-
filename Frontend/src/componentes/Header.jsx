import * as React from 'react';
import {TabContext, TabList,TabPanel } from '@mui/lab';
import { Button, Tab , Box} from '@mui/material';
import Jugador from '../inscripciones/Jugador';
import Equipo from '../inscripciones/Equipo';

function Header() {
  
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
      
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Inscribirse como jugador" value="1" />
            <Tab label="Inscribir equipo" value="2" />
            <Button variant="contained">Cerrar sesion</Button>
            <Button variant="contained">Iniciar sesion</Button>
          </TabList>
          
        </Box>
        <TabPanel value="1"><Jugador/></TabPanel>
        <TabPanel value="2"><Equipo/></TabPanel>

        
      </TabContext>
    </Box>
  );
}
export default Header;