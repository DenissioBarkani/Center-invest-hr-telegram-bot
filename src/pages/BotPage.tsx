import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Header } from '../components/Header.tsx';
import TabQuestions from '../components/TabQuestions.tsx';
import TabUserResponses from '../components/TabUserResponses.tsx';
import { BotInfoCard, type BotProps } from '../components/BotInfoCard.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BotPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [botInfo, setBotInfo] = useState<BotProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://6842d197e1347494c31e0af7.mockapi.io/bots/${id}/botinfo`
        );
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setBotInfo(response.data[0]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // eslint-disable-next-line no-console
            console.error('Server error:', error.response.status);
            setError(`Ошибка сервера: ${error.response.status}`);
          } else if (error.request) {
            // eslint-disable-next-line no-console
            console.error('Network error:', error.message);
            setError('Ошибка сети: нет ответа от сервера');
          } else {
            // eslint-disable-next-line no-console
            console.error('Request error:', error.message);
            setError(`Ошибка запроса: ${error.message}`);
          }
        } else {
          setError(
            `Произошла ошибка: ${error instanceof Error
              ? error.message
              : 'Неизвестная ошибка'
            }`
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
          {!loading && error && <Typography color="error">{error}</Typography>}
          {!loading && !error && botInfo && <BotInfoCard bot={botInfo} />}
          {!loading && !error && !botInfo && <Typography>Бот не найден</Typography>}
        </Paper>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Вопросы" />
          <Tab label="Ответы пользователей" />
        </Tabs>

        <Divider sx={{ mb: 3 }} />

        {activeTab === 0 && <TabQuestions />}
        {activeTab === 1 && <TabUserResponses />}
      </Box>
    </Box>
  );
};

export default BotPage;
