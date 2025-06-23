import { QuestionAnswer } from '@mui/icons-material';
import { List, Paper, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
// import type { UserAnswer } from './UserResponse.tsx';
import ResponsesItem from './ResponsesItem.tsx';
import type { Answers } from '../../../../shared/types/apiTypes.ts';
import { getResponses } from '../../../../shared/api/apiBot.ts';
import { useParams } from 'react-router-dom';

// export interface QuestionWithAnswers {
//   questionText: string;
//   countResponse: number;
//   answers: UserAnswer[];
// }

// const mockDataResponses: Answers[] = [
//   {
//     questionId: '1',
//     botId: '1',
//     title: 'Как вас зовут?',
//     countResponse: 5,
//     newResponse: 4,
//     answers: [
//       {
//         id: 'a1',
//         userId: 'user_789',
//         username: 'ivan_92',
//         response: 'Иван',
//         date: '2023-05-15 14:30',
//       },
//       {
//         id: 'a2',
//         userId: 'user_456',
//         username: 'anna_s',
//         response: 'Анна',
//         date: '2023-05-15 15:45',
//       },
//       {
//         id: 'a5',
//         userId: 'user_789',
//         username: 'ivan_92',
//         response: 'Иван',
//         date: '2023-05-15 14:30',
//       },
//     ],
//   },
//   {
//     questionId: '1',
//     botId: '1',
//     title: 'Как вас зовут?',
//     countResponse: 3,
//     newResponse: 5,
//     answers: [
//       {
//         id: 'a3',
//         userId: 'user_123',
//         username: 'petr_88',
//         response: ['React', 'TypeScript'],
//         date: '2023-05-16 09:15',
//       },
//       {
//         id: 'a4',
//         userId: 'user_789',
//         username: 'ivan_92',
//         response: ['Vue', 'JavaScript'],
//         date: '2023-05-16 10:20',
//       },
//     ],
//   },
// ];

// titleAnswer: 'Как вас зовут?'

const TabUsersResponses = () => {
  const [dataResponses, setDataResponses] = useState<Answers[]>([])
  const { id } = useParams<{ id: string }>();

  const fetchData = async (idFetch: string) => {
    const res = await getResponses(idFetch)
    setDataResponses(res)
  }

  useEffect(() => {
    if (!id) return;
    fetchData(id)
  }, [id])

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
        {dataResponses.map((usersResponse) => (
          <ResponsesItem
            key={`response-${usersResponse.questionId}`}
            usersResponse={usersResponse}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TabUsersResponses;
