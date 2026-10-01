import { zodResolver } from '@hookform/resolvers/zod';
import { SmartToy } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { login } from '../../shared/store/use-auth-store.ts';
// import { useAuthStore } from "../store/authStore";

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль минимум 6 символов'),
});

type LoginFormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // const login = useAuthStore((state) => state.login);
  // const login = false

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch {
      // Демонстрационный вход не предполагает серверных ошибок.
    }
  };

  const fillDemoData = () => {
    setValue('email', 'demo@center-invest.ru', { shouldValidate: true });
    setValue('password', 'portfolio', { shouldValidate: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
          <SmartToy />
        </Avatar>

        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>

        <Alert severity="info" sx={{ mt: 3, width: '100%' }}>
          Это демо-версия. Введите любой корректный email и пароль от 6 символов
          или заполните данные автоматически.
        </Alert>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Пароль"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={fillDemoData}
          >
            Заполнить демо-данные
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
