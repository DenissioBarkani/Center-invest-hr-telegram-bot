import { Edit, Delete } from '@mui/icons-material'
import { Paper, Box, Typography, IconButton } from '@mui/material'
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

export const Question: React.FC<Props> = ({ question }) => {
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

            <Typography variant="subtitle1" sx={{ mt: 1 }}>Варианты ответов:</Typography>
            <Box component={'ul'} sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                {question.answers.map((answer, i) => (
                    // <Chip key={i} label={answer} variant="outlined" />
                    <Typography key={i} component={'li'} variant="subtitle2" sx={{ mt: 0.5 }}>{i + 1}. {answer}</Typography>
                ))}
            </Box>
        </Paper>
    )
}
