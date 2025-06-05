import { Header } from "../components/Header";
import {
    Box,
    Stack,
    TextField,
    Button,
} from "@mui/material";

const AddBot: React.FC = () => {
    return (
        <Box component="main" maxWidth={600}>
            <Header title="Добавить Бота"></Header>
            <Stack spacing={3}>


                <TextField
                    required
                    label="Название бота"

                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    label="Токен от BotFather"

                    fullWidth
                    variant="standard"
                />

                <TextField
                    label="Описание"

                    multiline
                    rows={3}
                    fullWidth
                    variant="standard"
                />

                <Button variant="contained" color="primary">
                    Добавить
                </Button>
            </Stack>

        </Box>
    );
};

export default AddBot;
