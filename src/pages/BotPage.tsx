// src/pages/BotDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBotById } from '../api/bots'; // Ваш API-метод

interface Bot {
  id: string;
  name: string;
  token: string;
  status: 'online' | 'offline';
}

export default function BotPage() {
  const { id } = useParams<{ id: string }>();
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const data = await getBotById(id!);
        setBot(data);
      } catch (error) {
        console.error('Ошибка загрузки бота:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [id]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!bot) {
//     return <Typography variant="h6">Бот не найден</Typography>;
//   }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Алекс
      </Typography>
      
      <Box sx={{ 
        p: 3, 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        boxShadow: 1
      }}>
        {/* <Typography variant="body1">ID: {bot.id}</Typography>
        <Typography variant="body1">Статус: {bot.status}</Typography> */}
        {/* Другая информация о боте */}
      </Box>
    </Container>
  );
}