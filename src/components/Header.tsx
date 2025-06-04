import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Badge, Button, Container, Box } from '@mui/material'; // Добавили Box
import { Person, SmartToy } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
	return (
		<AppBar position="static">
			<Container>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}> 
				
					<Box
						component={Link}
						to="/"
						sx={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							color: 'inherit',
							flexGrow: 1 // Занимает всё доступное пространство слева
						}}
					>
						<SmartToy sx={{ mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							sx={{
								fontWeight: 700,
				
							}}
						>
							TG BOT ADMIN
						</Typography>
					</Box>

		
					<Button
						component={Link}
						to="/login"
						sx={{
							color: 'white',
							display: 'flex',
							alignItems: 'center',
							ml: 2
						}}
					>
						<Typography sx={{
							fontWeight: 700,
							mr: 1,
							fontSize: 18

						}}>Вход</Typography>
						<Badge color="secondary">
							<Person />
						</Badge>
					</Button>
				</Toolbar>
			</Container>
		</AppBar>
	);
}