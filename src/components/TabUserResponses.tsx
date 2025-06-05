import { Person } from '@mui/icons-material'
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Avatar } from '@mui/material'

const mockUserAnswers = [
    {
        id: 'a1',
        userId: 'user_789',
        username: 'ivan_92',
        questionId: 'q1',
        questionText: 'Как вас зовут?',
        answer: 'Иван',
        date: '2023-05-15 14:30'
    }
];

export default function TabUserResponses() {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Ответы пользователей</Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Пользователь</TableCell>
                            <TableCell>Вопрос</TableCell>
                            <TableCell>Ответ</TableCell>
                            <TableCell>Дата</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockUserAnswers.map((answer) => (
                            <TableRow key={answer.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                            <Person fontSize="small" />
                                        </Avatar>
                                        {answer.username}
                                    </Box>
                                </TableCell>
                                <TableCell>{answer.questionText}</TableCell>
                                <TableCell>{answer.answer}</TableCell>
                                <TableCell>{answer.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
