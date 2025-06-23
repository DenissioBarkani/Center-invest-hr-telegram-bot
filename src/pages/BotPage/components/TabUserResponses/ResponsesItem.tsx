import { CommentOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useState } from 'react';
// import type { QuestionWithAnswers } from './TabUsersResponses.tsx';
import { UserResponse } from './UserResponse.tsx';
// import { getResponses } from '../../../../shared/api/apiBot.ts';
import type { Answers, } from '../../../../shared/types/apiTypes.ts';
// import type { Answer } from '../../../../shared/types/apiTypes.ts';

interface QuestionWithAnswersProps {
  usersResponse: Answers;
}

const ResponsesItem = ({ usersResponse }: QuestionWithAnswersProps) => {
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
          primary={usersResponse.title}
          disableTypography
          secondary={(
            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
              <CommentOutlined fontSize="small" color="action" />
              <Typography variant="body2" component="span" color="text.secondary">
                {usersResponse.countResponse}
              </Typography>

              {usersResponse.newResponse > 0 && (
                <>
                  <CommentOutlined sx={{ ml: 1 }} fontSize="small" color="info" />
                  <Typography variant="body2" component="span" color="info">
                    {usersResponse.newResponse}
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
            {usersResponse.answers.map((answer) => (
              <UserResponse key={`answer-${answer.id}-${usersResponse.countResponse}`} response={answer} />
            ))}
          </List>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ResponsesItem;
