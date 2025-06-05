import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from "../components/Header";
import BotsList from "../components/BotsList";


const Home: React.FC = () => {
    return (

        <Box>
            <Header title="Боты"></Header>
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1000px' } }}>
                <Stack spacing={2} >
                    <BotsList />
                    <Button component={Link}
                        to="/add-bot" variant='contained' color='success'>Добавить бота</Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Home;
