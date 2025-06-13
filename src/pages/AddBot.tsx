import { useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { Box, Stack, TextField, Button, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { createNewBot } from '../api/apiBot';

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
    } = useForm<Bot>({ mode: 'onBlur' });

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

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

            setNotification({
                open: true,
                message: 'Бот успешно добавлен!',
                severity: 'success',
            });
            reset();
        } catch (error) {
            // let errorMessage = 'Произошла неизвестная ошибка';

            // if (axios.isAxiosError(error)) {
            //     const axiosError = error as AxiosError;

            //     if (axiosError.response) {
            //         // Сервер ответил с кодом ошибки
            //         errorMessage = `Ошибка сервера: ${axiosError.response.status}`;

            //         if (axiosError.response.data) {
            //             errorMessage += ` - ${JSON.stringify(axiosError.response.data)}`;
            //         }
            //     } else if (axiosError.request) {
            //         // Запрос был сделан, но ответа не получено
            //         errorMessage = 'Сервер не отвечает. Проверьте подключение к интернету.';
            //     } else {
            //         // Ошибка при настройке запроса
            //         errorMessage = `Ошибка при настройке запроса: ${axiosError.message}`;
            //     }
            // } else if (error instanceof Error) {
            //     errorMessage = error.message;
            // }
           setNotification({
                open: true,
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                severity: 'error',
            });
        }
    };

    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate maxWidth={600}>
            <Header title="Добавить Бота" />
            <Stack spacing={3}>
                <TextField
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
                            value.trim().length > 0 || 'Название не может быть пустым',
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
                            value.trim().length > 0 || 'Токен не может быть пустым',
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
                    size="large">
                    Добавить
                </Button>
            </Stack>

            <Snackbar
                role="alert"
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                    variant="filled">
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddBot;
