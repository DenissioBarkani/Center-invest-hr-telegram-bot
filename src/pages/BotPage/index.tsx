import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBotInfo } from '../../shared/api/apiBot.ts';
import type { ApiError } from '../../shared/api/errorHandler.ts';
import { addNotification } from '../../shared/store/use-notification-store.ts';
import { Header } from '../../shared/ui/Header.tsx';
import { BotInfoCard, type BotProps } from './components/BotInfoCard.tsx';
import TabQuestions from './components/TabQuestionsCreate/TabQuestions.tsx';
import TabUsersResponses from './components/TabUserResponses/TabUsersResponses.tsx';

const BotPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [botInfo, setBotInfo] = useState<BotProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notCon, setNotCon] = useState(false)

  // Определяем активную вкладку из URL при монтировании
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'responses') {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchParams(
      newValue === 1 ? { tab: 'responses' } : { tab: 'questions' }
    );
  };

  // useEffect(() => {
  //   if (!id) return;
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setErrorState(null);

  //     try {
  //       const response = await axios.get(
  //         `https://6842d197e1347494c31e0af7.mockapi.io/bots/${id}/botinfo`
  //       );
  //       if (response.status < 200 || response.status >= 300) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       setBotInfo(response.data[0]);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         if (error.response) {
  //           // eslint-disable-next-line no-console
  //           console.error('Server error:', error.response.status);
  //           setErrorState(`Ошибка сервера: ${error.response.status}`);
  //         } else if (error.request) {
  //           // eslint-disable-next-line no-console
  //           console.error('Network error:', error.message);
  //           setErrorState('Ошибка сети: нет ответа от сервера');
  //         } else {
  //           // eslint-disable-next-line no-console
  //           console.error('Request error:', error.message);
  //           setErrorState(`Ошибка запроса: ${error.message}`);
  //         }
  //       } else {
  //         setErrorState(
  //           `Произошла ошибка: ${error instanceof Error
  //             ? error.message
  //             : 'Неизвестная ошибка'
  //           }`
  //         );
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setErrorState(null);

      try {
        const response = await getBotInfo(id)
        setBotInfo(response);
        setNotCon(false)
      } catch (error) {
        // eslint-disable-next-line no-console
        // console.error(`error ${error}`)
        const apiError = error as ApiError;
        addNotification(apiError.message, 'error', 6000);
        setNotCon(true)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (notCon) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // или "100%" если родитель растянут
        width="100%"
      >
        <Typography variant='h6' sx={{ color: 'red' }}>
          Данные бота не найдены
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Header title="Настройка" />
      <Box>
        <Paper sx={{ p: 3, mb: 3 }}>
          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {!loading && errorState && <Typography color="error">{errorState}</Typography>}
          {!loading && !errorState && botInfo && <BotInfoCard bot={botInfo} />}
          {!loading && !errorState && !botInfo
            && <Typography variant='h6' sx={{ py: 2, color: 'red' }}>Данные бота не найдены</Typography>}
        </Paper>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Вопросы" />
          <Tab label="Ответы пользователей" />
        </Tabs>

        <Divider sx={{ mb: 3 }} />

        {activeTab === 0 && <TabQuestions />}
        {activeTab === 1 && <TabUsersResponses />}
      </Box>
    </Box>
  );
};

export default BotPage;
