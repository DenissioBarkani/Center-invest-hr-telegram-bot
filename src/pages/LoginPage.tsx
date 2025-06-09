import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Avatar,
    CssBaseline,
} from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useAuthStore } from "../store/authStore";

const schema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль минимум 6 символов"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
    const navigate = useNavigate();
    // const login = useAuthStore((state) => state.login);
    // const login = false


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            // ⚠️ Здесь будет запрос к API — сейчас заглушка
            console.log("Отправка данных:", data);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Заглушка задержки

            // Представим, что получили token с сервера
            // login("mock_token_value");
            navigate("/");
        } catch (err) {
            console.error("Ошибка авторизации", err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
                    <SmartToy />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Вход в систему
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Пароль"
                        type="password"
                        {...register("password")}
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
                        {isSubmitting ? "Вход..." : "Войти"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
