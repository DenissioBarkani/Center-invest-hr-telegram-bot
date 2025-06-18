import { CommentOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Paper, ListItem, IconButton, ListItemText, Box, Typography, Collapse, List } from '@mui/material';
import { useState } from 'react';
import { UserAnswerCard } from './UserAnswerCard.tsx';
import type { QuestionWithAnswers } from './TabUserResponses';

interface QuestionWithAnswersProps {
  usersResponse: QuestionWithAnswers;
}

const QuestionWithAnswersComponent = ({ usersResponse }: QuestionWithAnswersProps) => {
  const [open, setOpen] = useState(false);

  const MAX_VISIBLE_ITEMS = 2; // Количество элементов до скролла

  return (
    <Paper sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <ListItem
        sx={{ bgcolor: 'action.hover', cursor: 'pointer', '&:hover': { bgcolor: 'action.selected' } }}
        onClick={() => setOpen(!open)}
        secondaryAction={(
          <IconButton edge="end" onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      >
        <ListItemText
          primary={usersResponse.questionText}
          disableTypography
          secondary={(
            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
              <CommentOutlined fontSize="small" color="action" />
              <Typography variant="body2" component="span" color="text.secondary">
                {usersResponse.countResponse}
              </Typography>

              {true && (
                <>
                  <CommentOutlined sx={{ ml: 1 }} fontSize="small" color="info" />
                  <Typography variant="body2" component="span" color="info">
                    0
                  </Typography>
                </>
              )}

            </Box>
          )}
        />
      </ListItem>

      <Collapse in={open}>
        <Box
          sx={{
            height: usersResponse.answers.length > MAX_VISIBLE_ITEMS ? '300px' : 'auto',
            overflowY: usersResponse.answers.length > MAX_VISIBLE_ITEMS ? 'auto' : 'visible',
          }}
        >
          <List dense disablePadding>
            {usersResponse.answers.map((answer, i) => (
              <UserAnswerCard key={`answer-${answer.id}`} response={answer} />
            ))}
          </List>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default QuestionWithAnswersComponent;
