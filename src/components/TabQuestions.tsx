import { Delete, Add } from '@mui/icons-material'
import Edit from '@mui/icons-material/Edit';
import { Box, Button, Chip, IconButton, List, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Question } from './Question';




const mockQuestions = [
    {
        id: 1,
        text: 'Как вас зовут?',
        answers: ['Иван', 'Петр', 'Мария']
    },
    {
        id: 2,
        text: 'Сколько вам лет?',
        answers: ['До 18', '18-25', '26-35', 'Старше 35']
    }
];


export default function TabQuestions() {
    const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newAnswers, setNewAnswers] = useState(['', '']);

    const handleAddAnswerField = () => {
        setNewAnswers([...newAnswers, '']);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const updated = [...newAnswers];
        updated[index] = value;
        setNewAnswers(updated);
    };
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Управление вопросами</Typography>

            {/* Форма добавления/редактирования вопроса */}
            <Box component="form" sx={{ mb: 4 }}>
                <TextField
                    label="Текст вопроса"
                    fullWidth
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle1" gutterBottom>Варианты ответов:</Typography>

                {newAnswers.map((answer, index) => (
                    <Box key={index} display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            sx={{ mr: 1 }}
                        />
                        {index > 1 && (
                            <IconButton onClick={() => setNewAnswers(newAnswers.filter((_, i) => i !== index))}>
                                <Delete color="error" />
                            </IconButton>
                        )}
                    </Box>
                ))}

                <Button
                    startIcon={<Add />}
                    onClick={handleAddAnswerField}
                    sx={{ mr: 2 }}
                >
                    Добавить вариант
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    {editingQuestion ? 'Сохранить изменения' : 'Добавить вопрос'}
                </Button>
            </Box>

            {/* Список вопросов */}
            <List>
                {mockQuestions.map((question) => (
                    <Question question={question}></Question>
                ))}
            </List>
        </Paper>
    )
}

