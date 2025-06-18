import React from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../components/Header.tsx';
import { Box, Stack, TextField, Button } from '@mui/material';
import { createNewBot } from '../api/apiBot.ts';
import { addNotification } from '../store/use-notification-store.ts';

interface Bot {
  name: string;
  token: string;
  description?: string;
}

const AddBot: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Bot>({ mode: 'onChange' });

  const onSubmit = async (data: Bot) => {
    try {
      const payload = {
        name: data.name.trim(),
        id: Date.now().toString(),
        isOnline: false,
        newMessagesCount: 0,
        createdAt: Date.now(),
      };

      // await axios.post(
      //     "https://6842d197e1347494c31e0af7.mockapi.io/bots",
      //     payload,
      //     {
      //         timeout: 5000,
      //         headers: {
      //             'Content-Type': 'application/json',
      //         }
      //     }
      // );

      createNewBot(payload);

      addNotification('Бот успешно добавлен!', 'success', 6000);
      reset();
    } catch (error) {
      addNotification(
        error instanceof Error ? error.message : 'Неизвестная ошибка',
        'error',
        6000
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      maxWidth={600}
    >
      <Header title="Добавить Бота" />
      <Stack spacing={3}>
        <TextField
          required
          label="Название бота"
          fullWidth
          variant="standard"
          {...register('name', {
            required: 'Имя обязательно',
            maxLength: {
              value: 64,
              message: 'Максимум 64 символа',
            },
            validate: (value) =>
              value.trim().length > 0 ||
              'Название не может быть пустым',
          })}
          error={!!errors.name}
          helperText={errors.name?.message?.toString() || ''}
        />

        <TextField
          required
          label="Токен от BotFather"
          fullWidth
          variant="standard"
          {...register('token', {
            required: 'Токен обязателен',
            validate: (value) =>
              value.trim().length > 0 ||
              'Токен не может быть пустым',
          })}
          error={!!errors.token}
          helperText={errors.token?.message?.toString() || ''}
        />

        <TextField
          label="Описание"
          multiline
          rows={3}
          fullWidth
          variant="standard"
          {...register('description')}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={!isValid}
          color="primary"
          fullWidth
          size="large"
        >
          Добавить
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBot;
