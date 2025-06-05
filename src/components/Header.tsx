
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
	title: string;
}

export const Header: React.FC<Props> = ({
	title,
}) => {
	return (
		<Box sx={{ py: 2 }}>
			<Typography fontWeight={700} variant='h5'>{title}</Typography>
		</Box>
	);
}