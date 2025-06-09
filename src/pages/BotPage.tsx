import {
    Box,
    Paper,
    Divider,
    Tabs,
    Tab,
    CircularProgress,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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

        setLoading(true);
        setError(null);

        axios
            .get(
                `https://6842d197e1347494c31e0af7.mockapi.io/bots/${id}/botinfo`
            )
            .then((res) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                // console.log(res.data)
                setBotInfo(res.data[0]);
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Server error:", error.response.status);
                    setError(`Ошибка сервера: ${error.response.status}`);
                } else {
                    console.error("Request error:", error.message);
                    setError(`Ошибка запроса: ${error.message}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
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
