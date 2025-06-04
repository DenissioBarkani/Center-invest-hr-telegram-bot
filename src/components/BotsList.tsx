import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Bot {
  id: string;
  name: string;
  isOnline: boolean;
  newMessagesCount: number;
}

const initialBots: Bot[] = [
  { id: '1', name: 'NewsBot', isOnline: true, newMessagesCount: 5 },
  { id: '2', name: 'SupportBot', isOnline: false, newMessagesCount: 0 },
  { id: '3', name: 'QuizMaster', isOnline: true, newMessagesCount: 12 },
];

export default function BotsList() {
  const [bots, setBots] = React.useState<Bot[]>(initialBots);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [botToDelete, setBotToDelete] = React.useState<Bot | null>(null);
  const navigate = useNavigate();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBotClick = (id: string) => {
    navigate(`/bots/${id}`);
  };

  const handleDelete = (id: string) => {
    setBots((prev) => prev.filter((bot) => bot.id !== id));
    setBotToDelete(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align='center' >Новых сообщений</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bots
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bot) => (
                <TableRow
                  key={bot.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleBotClick(bot.id)}
                >
                  <TableCell>{bot.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={bot.isOnline ? 'В сети' : 'Не в сети'}
                      color={bot.isOnline ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {bot.newMessagesCount > 0 ? (
                      <Chip
                        label={bot.newMessagesCount}
                        color="primary"
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Нет новых
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={(e) => e.stopPropagation()} // предотвратить переход по клику
                  >
                    <IconButton
                      onClick={() => setBotToDelete(bot)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={bots.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Диалог подтверждения удаления */}
      <Dialog open={!!botToDelete} onClose={() => setBotToDelete(null)}>
        <DialogTitle>Удалить бота?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить бота{' '}
            <strong>{botToDelete?.name}</strong>? Это действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBotToDelete(null)} color="primary">
            Отмена
          </Button>
          <Button
            onClick={() => botToDelete && handleDelete(botToDelete.id)}
            color="error"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
