import {
    Paper, Typography, Box, Avatar, Chip, Divider, IconButton,
    Collapse, List, ListItem, ListItemText, ListItemAvatar
} from '@mui/material';
import {
    Person, ExpandMore, ExpandLess, QuestionAnswer,
    CalendarToday
} from '@mui/icons-material';
import { useState } from 'react';


type ExpandedState = {
    q1: boolean;
    q2: boolean;
    [key: string]: boolean; 
};


export default function UserResponsesTab() {
    const [expanded, setExpanded] = useState<ExpandedState>({
        q1: false,
        q2: false
    });

    const toggle = (id: keyof ExpandedState) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight={600} mb={3} display="flex" alignItems="center" gap={1}>
                <QuestionAnswer fontSize="medium" />
                Ответы пользователей
            </Typography>

            <List>

                {/* Вопрос 1 */}
                <Paper sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
                    <ListItem
                        sx={{ bgcolor: 'action.hover', cursor: 'pointer', '&:hover': { bgcolor: 'action.selected' } }}
                        onClick={() => toggle('q1')}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => toggle('q1')}>
                                {expanded.q1 ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={"Как вас зовут"}
                            disableTypography
                            secondary={
                                <Box display="flex" alignItems="center" mt={0.5}>
                                    <Typography variant="body2" component="span" color="text.secondary">
                                        2 ответа
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>

                    <Collapse in={expanded.q1}>
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
                                                <Typography variant="subtitle2" component="span">ivan_92</Typography>
                                                <Chip label="ID: a1" size="small" sx={{ height: 20 }} />
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                    <CalendarToday sx={{ fontSize: 14 }} />
                                                    <Typography variant="caption" component="span">2023-05-15 14:30</Typography>
                                                </Box>
                                                <Typography variant="body2" component="span" sx={{ display: 'block', mt: 1 }}>
                                                    Иван
                                                </Typography>
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
                                                <Typography variant="subtitle2" component="span">anna_s</Typography>
                                                <Chip label="ID: a2" size="small" sx={{ height: 20 }} />
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                    <CalendarToday sx={{ fontSize: 14 }} />
                                                    <Typography variant="caption" component="span">2023-05-15 15:45</Typography>
                                                </Box>
                                                <Typography variant="body2" component="span" sx={{ display: 'block', mt: 1 }}>
                                                    Анна
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </Box>
                        </List>
                    </Collapse>
                </Paper>

                {/* Вопрос 2 */}
                <Paper sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
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
                </Paper>
            </List>
        </Paper>
    );
}
