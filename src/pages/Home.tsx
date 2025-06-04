
import { SideBar } from "../components/SideBar";
import { MainGrid } from "../components/MainGrid";

import Box from '@mui/material/Box';
import { HeaderV2 } from "../components/HeaderV2";


const Home: React.FC = () => {
    return (

        <Box>
            <SideBar></SideBar>
            <Box
                component="main"
                ml={'240px'}
            >

                <Box


                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <HeaderV2></HeaderV2>
                    <MainGrid></MainGrid>
                </Box>
            </Box>

        </Box>


    );
}

export default Home;
