import { Cancel, CheckCircle, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField, Typography, Button, Chip } from '@mui/material';
import React, { useState } from 'react'

interface BotProps {
    id: number,
    name: string,
    token: string,
    status: 0 | 1
}

const initialBotData: BotProps = {
    id: 12,
    name: 'Алекс',
    token: '123456789:AAEe4r5t6y7u8i9o0p',
    status: 1
};


interface Props {
    bot: BotProps[];
    // isEditing: boolean;
    // onEditToggle: () => void;
    // onSave: () => void;
    // onFieldChange: (field: 'name' | 'token', value: string) => void;
}


export const BotInfoCard: React.FC<Props> = () => {
    const [botData, setBotData] = useState<BotProps>(initialBotData);
    const [isEditingBot, setIsEditingBot] = useState(false);

    const toggleEditBot = () => {
        setIsEditingBot(!isEditingBot);
    };

    const saveBotChanges = () => {
        // Здесь будет логика сохранения изменений
        console.log('Сохранение данных бота:', botData);
        setIsEditingBot(false);
    };

    const handleBotFieldChange = (field: 'name' | 'token', value: string) => {
        setBotData({ ...botData, [field]: value });
    };

    // const copyToClipboard = (text: string) => {
    //     navigator.clipboard.writeText(text);
    // };
    return (
        <>
            <Box   display="flex" justifyContent="space-between" alignItems="center">
                {isEditingBot ? (
                    <TextField
                        value={botData.name}
                        onChange={(e) => handleBotFieldChange('name', e.target.value)}
                        fullWidth
                        sx={{ mr: 2 }}
                    />
                ) : (
                    <Typography variant="h4">{botData.name}</Typography>
                )}
                <Chip
                    label={botData.status === 1 ? 'Online' : 'Offline'}
                    color={botData.status === 1 ? 'success' : 'error'}
                    icon={botData.status === 1 ? <CheckCircle /> : <Cancel />}
                    clickable={false}
                    onClick={(e) => e.stopPropagation()} // Останавливаем всплытие
                />
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>ID:</strong> {botData.id}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Token:</strong>
                </Typography>
                {isEditingBot ? (
                    <TextField
                        value={botData.token}
                        onChange={(e) => handleBotFieldChange('token', e.target.value)}
                        fullWidth

                    />
                ) : (
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ fontFamily: 'monospace' }}>
                            {botData.token.substring(0, 10)}...
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {isEditingBot ? (
                    <>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={saveBotChanges}
                            >
                                Сохранить
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={toggleEditBot}
                            >
                                Отмена
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={toggleEditBot}
                    >
                        Редактировать
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                >
                    Удалить бота
                </Button>
            </Box>
        </>

    )
}
