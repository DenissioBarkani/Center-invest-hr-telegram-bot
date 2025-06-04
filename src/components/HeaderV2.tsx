
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';


export const HeaderV2: React.FC = () => {
	return (
		<Box  sx={{py: 2}}>
			<Typography fontWeight={700} variant='h5'>Боты</Typography>
		</Box>
	);
}