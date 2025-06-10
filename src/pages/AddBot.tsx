import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { Box, Stack, TextField, Button } from "@mui/material";

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
    } = useForm<Bot>({ mode: "onBlur" });

    const onSubmit = (data: Bot) => {
        // const payload = {
        //     ...data,
        //     description: data.description?.trim() === '' ? null : data.description.trim(),
        // };
        

        alert(JSON.stringify(data));
        reset();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            maxWidth={600}
        >
            <Header title="Добавить Бота"></Header>
            <Stack spacing={3}>
                <TextField
                    label="Название бота"
                    fullWidth
                    variant="standard"
                    {...register("name", {
                        required: "Имя обязательно",
                        maxLength: {
                            value: 64,
                            message: "Максимум 64 символа",
                        },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString() || ""}
                />

                <TextField
                    required
                    label="Токен от BotFather"
                    fullWidth
                    variant="standard"
                    {...register("token", {
                        required: "Токен обязательен",
                    })}
                    error={!!errors.token}
                    helperText={errors.token?.message?.toString() || ""}
                />

                <TextField
                    label="Описание"
                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                />

                <Button variant="contained" type="submit"
                    disabled={!isValid} color="primary">
                    Добавить
                </Button>
            </Stack>
        </Box>
    );
};

export default AddBot;
