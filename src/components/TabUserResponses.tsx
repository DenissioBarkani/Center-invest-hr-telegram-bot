import {
    Paper, Typography,
    List,
} from '@mui/material';
import {
    QuestionAnswer,

} from '@mui/icons-material';

import UserResponsesItem from './QuestionWithAnswers';
import type { UserAnswer } from './UserAnswerCard';

export interface QuestionWithAnswers {
    questionText: string;
    countResponse: number;
    answers: UserAnswer[];
}

const mockDataResponses: QuestionWithAnswers[] = [
    {
        questionText: 'Как вас зовут?',
        countResponse: 5,
        answers: [
            {
                id: 'a1',
                userId: 'user_789',
                username: 'ivan_92',
                response: 'Иван',
                date: '2023-05-15 14:30'
            },
            {
                id: 'a2',
                userId: 'user_456',
                username: 'anna_s',
                response: 'Анна',
                date: '2023-05-15 15:45'
            },
            {
                id: 'a5',
                userId: 'user_789',
                username: 'ivan_92',
                response: 'Иван',
                date: '2023-05-15 14:30'
            },
        ]
    },
    {
        questionText: 'Какие технологии вы используете?',
        countResponse: 3,
        answers: [
            {
                id: 'a3',
                userId: 'user_123',
                username: 'petr_88',
                response: ['React', 'TypeScript'],
                date: '2023-05-16 09:15'
            },
            {
                id: 'a4',
                userId: 'user_789',
                username: 'ivan_92',
                response: ['Vue', 'JavaScript'],
                date: '2023-05-16 10:20'
            }
        ]
    }
];

// titleAnswer: 'Как вас зовут?'


export default function UserResponsesTab() {
    // const [dataResponses, setDataResponses] = useState()


    // const toggle = (id: keyof ExpandedState) => {
    //     setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    // };

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={3} display="flex" alignItems="center" gap={1}>
                <QuestionAnswer fontSize="medium" />
                Ответы пользователей
            </Typography>

            <List>
                {mockDataResponses.map((usersResponse, index) => (
                    <UserResponsesItem key={index} usersResponse={usersResponse} />
                ))}

                {/* Вопрос 1 */}


                {/* Вопрос 2 */}
                {/* <Paper sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
                    <ListItem
                        sx={{ bgcolor: 'action.hover', cursor: 'pointer', '&:hover': { bgcolor: 'action.selected' } }}
                        onClick={() => toggle('q2')}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => toggle('q2')}>
                                {expanded.q2 ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        }
                    >
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="subtitle1" component="div">Какие технологии вы используете?</Typography>}
                            secondary={
                                <Box display="flex" alignItems="center" mt={0.5}>
                                    <Typography variant="body2" component="span" color="text.secondary">
                                        2 ответа
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>

                    <Collapse in={expanded.q2}>
                        <List dense disablePadding>
                            <Box>
                                <Divider />
                                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 36, height: 36 }}>
                                            <Person />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle2" component="span">petr_88</Typography>
                                                <Chip label="ID: a3" size="small" sx={{ height: 20 }} />
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                    <CalendarToday sx={{ fontSize: 14 }} />
                                                    <Typography variant="caption" component="span">2023-05-16 09:15</Typography>
                                                </Box>
                                                <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                                                    <Chip label="React" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                    <Chip label="TypeScript" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </Box>

                            <Box>
                                <Divider />
                                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 36, height: 36 }}>
                                            <Person />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle2" component="span">ivan_92</Typography>
                                                <Chip label="ID: a4" size="small" sx={{ height: 20 }} />
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                    <CalendarToday sx={{ fontSize: 14 }} />
                                                    <Typography variant="caption" component="span">2023-05-16 10:20</Typography>
                                                </Box>
                                                <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                                                    <Chip label="Vue" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                    <Chip label="JavaScript" size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </Box>
                        </List>
                    </Collapse>
                </Paper> */}
            </List>
        </Paper>
    );
}
