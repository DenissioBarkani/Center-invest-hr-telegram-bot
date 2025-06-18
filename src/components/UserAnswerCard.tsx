import { Person } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

export interface UserAnswer {
  id: string;
  userId: string;
  username: string;
  response: string | string[];
  date: string;
}

interface UserAnswerCardProps {
  response: UserAnswer;
}

export const UserAnswerCard: React.FC<UserAnswerCardProps> = ({ response }) => {
  return (
    <Box minHeight={110}>
      <Divider />
      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
        <ListItemAvatar>
          <Avatar sx={{ width: 36, height: 36 }}>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={(
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {response.username}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {response.date}
              </Typography>
            </Box>
          )}
          secondary={(
            <Box sx={{ mt: 1 }}>
              {Array.isArray(response.response) ? (
                <List disablePadding dense>
                  {Array.isArray(response.response) ? (
                    response.response.map((item, index) => (
                      <ListItem
                        key={`answer-${index + 1}`}
                        disableGutters
                        sx={{ p: 0 }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          {/* Номер ответа */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ minWidth: 20 }}
                          >
                            {index + 1}.
                          </Typography>

                          {/* Сам ответ */}
                          <ListItemText
                            primaryTypographyProps={{
                              variant: 'body2',
                            }}
                            primary={item}
                          />
                        </Box>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2">
                      {response.response}
                    </Typography>
                  )}
                </List>
              ) : (
                <Typography variant="body2">
                  {response.response}
                </Typography>
              )}
            </Box>
          )}
        />
      </ListItem>
    </Box>
  );
};
