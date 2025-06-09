import { Cancel, CheckCircle, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField, Typography, Button, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface BotProps {
  botId: number;
  name: string;
  token: string;
  description: string;
  isActive: boolean;
}

interface BotInfoCardProps {
  bot: BotProps;
}

export const BotInfoCard: React.FC<BotInfoCardProps> = ({ bot }) => {
  const [isEditingBot, setIsEditingBot] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<BotProps>({
    defaultValues: bot,
  });

  const onSubmit = (data: BotProps) => {
    // написать код отправки на сервер
    console.log('Сохранение данных бота:', data);
    setIsEditingBot(false);
    reset(); 
  };

  const handleCancel = () => {
    reset(); 
    setIsEditingBot(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {isEditingBot ? (
          <TextField
            {...register('name', { required: 'Имя обязательно' })}
            fullWidth
            sx={{ mr: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        ) : (
          <Typography variant="h4">{bot.name}</Typography>
        )}
        <Chip
          label={bot.isActive ? 'Online' : 'Offline'}
          color={bot.isActive ? 'success' : 'error'}
          icon={bot.isActive ? <CheckCircle /> : <Cancel />}
        />
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>ID:</strong> {bot.botId}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1"><strong>Token:</strong></Typography>
        {isEditingBot ? (
          <TextField
            {...register('token', { required: 'Токен обязателен' })}
            fullWidth
            error={!!errors.token}
            helperText={errors.token?.message}
          />
        ) : (
          <Typography sx={{ fontFamily: 'monospace' }}>
            {bot.token.substring(0, 10) + '...'}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1"><strong>Описание:</strong></Typography>
        {isEditingBot ? (
          <TextField
            {...register('description')}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          />
        ) : (
          <Typography sx={{ fontFamily: 'monospace' }}>
            {bot.description}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        {isEditingBot ? (
          <>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
            >
              Сохранить
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Отмена
            </Button>
          </>
        ) : (
          <Button variant="contained" startIcon={<Edit />} onClick={() => setIsEditingBot(true)}>
            Редактировать
          </Button>
        )}
        <Button variant="contained" color="error" startIcon={<Delete />}>
          Удалить бота
        </Button>
      </Box>
    </Box>
  );
};
