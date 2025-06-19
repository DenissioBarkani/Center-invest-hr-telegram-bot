import { QuestionAnswer } from '@mui/icons-material';
import { List, Paper, Typography } from '@mui/material';

import { useEffect } from 'react';
import type { UserAnswer } from './UserResponse.tsx';
import ResponsesItem from './ResponsesItem.tsx';

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
        date: '2023-05-15 14:30',
      },
      {
        id: 'a2',
        userId: 'user_456',
        username: 'anna_s',
        response: 'Анна',
        date: '2023-05-15 15:45',
      },
      {
        id: 'a5',
        userId: 'user_789',
        username: 'ivan_92',
        response: 'Иван',
        date: '2023-05-15 14:30',
      },
    ],
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
        date: '2023-05-16 09:15',
      },
      {
        id: 'a4',
        userId: 'user_789',
        username: 'ivan_92',
        response: ['Vue', 'JavaScript'],
        date: '2023-05-16 10:20',
      },
    ],
  },
];

// titleAnswer: 'Как вас зовут?'

const TabUsersResponses = () => {
  useEffect(() => {
    // Инициализация компонента
  }, []);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <QuestionAnswer fontSize="medium" />
        Ответы пользователей
      </Typography>

      <List>
        {mockDataResponses.map((usersResponse) => (
          <ResponsesItem
            key={`response-${usersResponse.questionText}`}
            usersResponse={usersResponse}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TabUsersResponses;
