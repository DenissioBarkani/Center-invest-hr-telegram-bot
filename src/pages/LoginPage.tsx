import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Avatar,
    CssBaseline
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SmartToy } from '@mui/icons-material';
// import { useAuthStore } from '../store/authStore'; // Ваш Zustand-стор

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Логика авторизации
        console.log('Email:', email, 'Password:', password);
        navigate('/');
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
                {/* Аватар с иконкой */}
                <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                    <SmartToy />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Вход в систему
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}