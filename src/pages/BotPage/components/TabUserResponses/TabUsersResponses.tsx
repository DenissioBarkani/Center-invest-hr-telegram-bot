import { QuestionAnswer } from '@mui/icons-material';
import { List, Paper, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
// import type { UserAnswer } from './UserResponse.tsx';
import { getResponses } from '../../../../shared/api/apiBot.ts';
import type { Answers } from '../../../../shared/types/apiTypes.ts';
import ResponsesItem from './ResponsesItem.tsx';

interface TabUsersResponsesProps {
  botId: string;
}

const TabUsersResponses: React.FC<TabUsersResponsesProps> = ({ botId }) => {
  const [dataResponses, setDataResponses] = useState<Answers[]>([]);

  const fetchData = async (idFetch: string) => {
    const res = await getResponses(idFetch);
    setDataResponses(res);
  };

  useEffect(() => {
    if (!botId) return;
    fetchData(botId);
  }, [botId]);

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
