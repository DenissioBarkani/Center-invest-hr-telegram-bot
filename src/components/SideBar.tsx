// import { AppBar } from "@mui/material";

// export const SideBar: React.FC = () => {
//     return (
//         <AppBar position="static">

//         </AppBar>
//     );
// }

import { Link } from 'react-router-dom';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SideBarList } from './SideBarMenu';
import { Person, SmartToy } from '@mui/icons-material';
import { Badge, Button, Divider } from '@mui/material';
// import SelectContent from './SelectContent';
// import MenuContent from './MenuContent';
// import CardAlert from './CardAlert';
// import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    position: 'static',
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export const SideBar: React.FC = () => {
    // const [login, setLogin] = React.useState(true)
    const login = false
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >

            <Box
                component={Link}
                to="/"
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'blue',
                    flexGrow: 1 // Занимает всё доступное пространство слева
                }}
            >
                <SmartToy sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontWeight: 700,

                    }}
                >
                    TG BOT ADMIN
                </Typography>
            </Box>

            <Divider sx={{
                borderColor: 'text.primary',
                opacity: 0.2,
            }} />
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <SideBarList />
                {/* <CardAlert /> */}
            </Box>


            {
                !login ? (<Button
                    component={Link}
                    to="/login"
                    sx={{
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{
                        fontWeight: 700,
                        mr: 1,
                        fontSize: 18

                    }}>Вход</Typography>
                    <Badge color="secondary">
                        <Person />
                    </Badge>

                </Button>) : (
                    <Stack
                        direction="row"
                        sx={{
                            p: 2,
                            gap: 1,
                            alignItems: 'center',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Avatar
                            sizes="small"
                            alt="Riley Carter"
                            src="/static/images/avatar/7.jpg"
                            sx={{ width: 36, height: 36 }}
                        />

                        <Box sx={{ mr: 'auto' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                                Riley Carter
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                riley@email.com
                            </Typography>
                        </Box>
                    </Stack>
                )
            }


        </Drawer>
    );
}
