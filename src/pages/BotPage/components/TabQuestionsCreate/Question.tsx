import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import type { QuestionType } from '../../../../shared/types/apiTypes';

interface Props {
  question: QuestionType;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const Question: React.FC<Props> = ({ question, onDelete, loading }) => {
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
          <IconButton
            onClick={() => onDelete(question.id)}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="error" />
            ) : (
              <Delete color="error" />
            )}
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
        {question.answers &&
          question.answers.map((answer, i) => (
            <Typography
              key={`answer-${i + 1}`}
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
