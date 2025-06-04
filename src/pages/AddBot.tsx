import { SideBar } from "../components/SideBar";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const AddBot: React.FC = () => {
  return (
    <Box>
      <SideBar />
      <Box component="main" ml={{ md: "240px" }} px={3} py={5}>
       
          <Stack spacing={3}>
            <Typography variant="h4">Добавить Бота</Typography>

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
    </Box>
  );
};

export default AddBot;
