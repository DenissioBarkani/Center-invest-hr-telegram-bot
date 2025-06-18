import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, List, Paper, Typography } from '@mui/material';
import React from 'react';

interface QuestionData {
  id: number;
  text: string;
  answers: string[];
}

interface Props {
  question: QuestionData;
}
//  onClick={() => setEditingQuestion(question.id)}

export const Question: React.FC<Props> = ({ question }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">
          Текст вопроса: {question.text}
        </Typography>

        <Box>
          <IconButton>
            <Edit color="primary" />
          </IconButton>
          <IconButton>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Варианты ответов:
      </Typography>
      <List
        component="ul"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {question.answers.map((answer, i) => (
          <Typography
            key={`answer-${question.id}`}
            component="li"
            variant="subtitle2"
            sx={{ mt: 0.5 }}
          >
            {i + 1}. {answer}
          </Typography>
        ))}
      </List>
    </Paper>
  );
};
