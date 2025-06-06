import {
    Box,
    Paper,

    Divider,

    Tabs,
    Tab,

} from '@mui/material';
import { useState } from 'react';
import { Header } from '../components/Header';
import TabQuestions from '../components/TabQuestions';
import TabUserResponses from '../components/TabUserResponses';
import { BotInfoCard } from '../components/BotInfoCard';



export default function BotPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box>
            <Header title="Настройка"></Header>
            <Box>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <BotInfoCard bot={[]}></BotInfoCard>
                </Paper>

                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab label="Вопросы" />
                    <Tab label="Ответы пользователей" />
                </Tabs>

                <Divider sx={{ mb: 3 }} />

                {activeTab === 0 && (
                    <TabQuestions></TabQuestions>
                )}

                {activeTab === 1 && (
                    <TabUserResponses></TabUserResponses>
                )}
            </Box>
        </Box>
    );
};