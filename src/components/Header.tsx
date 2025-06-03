import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Badge, Container, IconButton } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
// import Button from '@mui/material/Button';

// import MenuIcon from '@mui/icons-material/Menu';

// interface Props {
// 	className?: string;
// }
// <Props>
export const Header: React.FC = () => {
	return (

		<AppBar position="static">

			<Container>
				<Toolbar>

					<Typography variant='h6' component="span" sx={{ flexGrow: 1 }}>TG BOT ADMIN</Typography>
					<IconButton color='inherit' >

						<Badge color='secondary' >
							<ShoppingBasket></ShoppingBasket>
						</Badge>
					</IconButton>

				</Toolbar>
			</Container>
		</AppBar>

	);
}


