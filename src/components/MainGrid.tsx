

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BotsList from './BotsList';

export const MainGrid: React.FC = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Боты
            </Typography> */}
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <BotsList />
                </Grid>
            </Grid>
        </Box>
    );
}


