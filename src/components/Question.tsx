import { Edit, Delete } from '@mui/icons-material'
import { Paper, Box, Typography, IconButton, Chip } from '@mui/material'
import React from 'react'


interface Question {
    id: number;
    text: string,
    answers: string[]

}
interface Props {
    question: Question;
}
//  onClick={() => setEditingQuestion(question.id)}

export const Question: React.FC<Props> = ({question}) => {
    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Текст вопроса: {question.text}</Typography>
                <Box>
                    <IconButton>
                        <Edit color="primary" />
                    </IconButton>
                    <IconButton>
                        <Delete color="error" />
                    </IconButton>
                </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>Варианты ответов:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {question.answers.map((answer, i) => (
                    <Chip key={i} label={answer} variant="outlined" />
                ))}
            </Box>
        </Paper>
    )
}
