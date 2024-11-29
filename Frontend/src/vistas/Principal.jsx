import * as React from 'react';
import {TabContext, TabList,TabPanel } from '@mui/lab';
import { Button, Tab , Box} from '@mui/material';
import Jugador from '../inscripciones/Jugador';
import Equipo from '../inscripciones/Equipo'; 
import Torneo from '../inscripciones/Torneo';
import { useAuth } from '../hooks/AuthContext';


function Principal() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const { logout, esJugador, esEncargado} = useAuth();
  
    const handleCerrarSecion = () =>{
      logout();
    }
        
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        {
            esJugador() && (
                <TabContext value={value}>
                    <Box sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box sx={{ width: '80%' }}>
                            <TabList 
                                onChange={handleChange} 
                                aria-label="lab API tabs example"
                                sx={{ 
                                    minHeight: '48px',
                                    '& .MuiTab-root': {
                                        minHeight: '48px'
                                    }
                                }}
                            >
                                <Tab label="Inscribirse como jugador" value="1" />
                                <Tab label="Inscribir equipo" value="2" />
                            </TabList>
                        </Box>
                        <Button 
                            variant="contained" 
                            onClick={handleCerrarSecion}
                            sx={{ 
                                marginLeft: 'auto',
                                height: '40px'
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>
                    <TabPanel value="1"><Jugador/></TabPanel>
                    <TabPanel value="2"><Equipo/></TabPanel>
                </TabContext>
            )
        }

        {
            esEncargado() && (
                <TabContext value={value}>
                    <Box sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box sx={{ width: '80%' }}>
                            <TabList 
                                onChange={handleChange} 
                                aria-label="lab API tabs example"
                                sx={{ 
                                    minHeight: '48px',
                                    '& .MuiTab-root': {
                                        minHeight: '48px'
                                    }
                                }}
                            >
                                <Tab label="Gestionar Torneo" value="1" />
                            </TabList>
                        </Box>
                        <Button 
                            variant="contained" 
                            onClick={handleCerrarSecion}
                            sx={{ 
                                height: '40px'
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>
                    <TabPanel value="1"><Torneo/></TabPanel>
                </TabContext>
            )
        }
      </Box>
    );
}

export default Principal;