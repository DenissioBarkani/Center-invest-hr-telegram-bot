import { Cancel, CheckCircle, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField, Typography, Button, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface BotProps {
    botId: number;
    name: string;
    token: string;
    description: string;
    isActive: boolean;
}

interface BotInfoCardProps {
    bot: BotProps;
}

export const BotInfoCard: React.FC<BotInfoCardProps> = ({ bot }) => {
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<BotProps>({
        defaultValues: bot,
        mode: 'onChange',
    });

    const handleEdit = () => {
        reset(bot);
        setIsEditing(true);
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const onSubmit = (data: BotProps) => {
        console.log('Сохранение данных бота:', data);
        setIsEditing(false);
        reset(data);
    };

    const renderViewMode = () => (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{bot.name}</Typography>
                <Chip
                    label={bot.isActive ? 'Online' : 'Offline'}
                    color={bot.isActive ? 'success' : 'error'}
                    icon={bot.isActive ? <CheckCircle /> : <Cancel />}
                />
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}><strong>ID:</strong> {bot.botId}</Typography>

            <Typography variant="body1" sx={{ mt: 2 }}><strong>Token:</strong></Typography>
            <Typography sx={{ fontFamily: 'monospace' }}>{bot.token.substring(0, 10) + '...'}</Typography>

            <Typography variant="body1" sx={{ mt: 2 }}><strong>Описание:</strong></Typography>
            <Typography sx={{ fontFamily: 'monospace' }}>{bot.description}</Typography>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent:"space-between", gap: 2 }}>
                <Button variant="contained" startIcon={<Edit />} onClick={handleEdit}>
                    Редактировать
                </Button>
                <Button variant="contained" color="error" startIcon={<Delete />}>
                    Удалить бота
                </Button>
            </Box>
        </Box>
    );

    const renderEditMode = () => (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <TextField
                    {...register('name', {
                        required: 'Имя обязательно',
                        maxLength: { value: 64, message: 'Максимум 64 символа' },
                    })}
                    fullWidth
                    label="Имя бота"
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString() || ""}
                    sx={{ mr: 2 }}
                />
                <Chip
                    label={bot.isActive ? 'Online' : 'Offline'}
                    color={bot.isActive ? 'success' : 'error'}
                    icon={bot.isActive ? <CheckCircle /> : <Cancel />}
                />
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}><strong>ID:</strong> {bot.botId}</Typography>

            <TextField
                {...register('token', { required: 'Токен обязателен' })}
                fullWidth
                label="Token"
                error={!!errors.token}
                helperText={errors.token?.message}
                sx={{ mt: 2 }}
            />

            <TextField
                {...register('description')}
                fullWidth
                multiline
                rows={3}
                label="Описание"
                sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<Save />}
                    type="submit"
                    disabled={!isDirty || !isValid}
                >
                    Сохранить
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                    Отмена
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box>
            {isEditing ? renderEditMode() : renderViewMode()}
        </Box>
    );
};
