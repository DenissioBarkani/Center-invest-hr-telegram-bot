import {
    Box,
    Paper,
    Divider,
    Tabs,
    Tab,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import TabQuestions from "../components/TabQuestions";
import TabUserResponses from "../components/TabUserResponses";
import { BotInfoCard, type BotProps } from "../components/BotInfoCard";
import { useParams } from "react-router-dom";
import axios from "axios";



export default function BotPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [botInfo, setBotInfo] = useState<BotProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://6842d197e1347494c31e0af7.mockapi.io/bots/${id}/botinfo`
                )
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setBotInfo(response.data[0]);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error("Server error:", error.response.status);
                        setError(`Ошибка сервера: ${error.response.status}`);
                    } else if (error.request) {
                        console.error("Network error:", error.message);
                        setError("Ошибка сети: нет ответа от сервера");
                    } else {
                        console.error("Request error:", error.message);
                        setError(`Ошибка запроса: ${error.message}`);
                    }
                } else {
                    setError(`Произошла ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return (
        <Box>
            <Header title="Настройка" />
            <Box>
                <Paper sx={{ p: 3, mb: 3 }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : botInfo ? (
                        <BotInfoCard bot={botInfo} />
                    ) : (
                        <Typography>Бот не найден</Typography>
                    )}
                </Paper>

                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                >
                    <Tab label="Вопросы" />
                    <Tab label="Ответы пользователей" />
                </Tabs>

                <Divider sx={{ mb: 3 }} />

                {activeTab === 0 && <TabQuestions />}
                {activeTab === 1 && <TabUserResponses />}
            </Box>
        </Box>
    );
}
