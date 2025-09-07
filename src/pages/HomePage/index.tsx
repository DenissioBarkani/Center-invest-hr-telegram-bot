import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../shared/ui/Header.tsx';
import BotsList from './components/BotsList.tsx';

const HomePage: React.FC = () => {
  return (
    <Box>
      <Header title="Боты" />
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1000px' } }}>
        <Stack spacing={2}>
          <BotsList />
          <Button
            component={Link}
            to="/add-bot"
            variant="contained"
            color="success"
          >
            Добавить бота
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
