import Box from '@mui/material/Box';

import { Outlet } from 'react-router-dom';
import { NotificationContainer } from './components/Notification.tsx';
import { SideBar } from './components/SideBar.tsx';

export const Layout = () => {
  return (
    <Box>
      <SideBar />
      <Box component="main" ml="240px">
        <Box sx={{ mx: 3, pb: 5 }}>
          <Outlet />{' '}
          {/* Здесь будут отображаться дочерние маршруты */}
        </Box>
      </Box>
      <NotificationContainer />
    </Box>
  );
};
