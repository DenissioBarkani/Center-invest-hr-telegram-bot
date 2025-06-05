import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents } from 'react-virtuoso';
import { useNavigate } from 'react-router-dom';
import { Cancel, CheckCircle, MessageRounded } from '@mui/icons-material';

interface Data {
  id: number;
  lastName: string;
  isOnline: boolean;
  phone: string;
  newMessagesCount: number;
}

const initialRows: Data[] = [
  { id: 1, lastName: 'Smith', isOnline: true, phone: '123-456-7890', newMessagesCount: 42 },
  { id: 2, lastName: 'Johnson', isOnline: true, phone: '234-567-8901', newMessagesCount: 17 },
  { id: 3, lastName: 'Brown', isOnline: true, phone: '345-678-9012', newMessagesCount: 0 },
  { id: 4, lastName: 'White', isOnline: true, phone: '456-789-0123', newMessagesCount: 5 },
  { id: 5, lastName: 'Davis', isOnline: true, phone: '567-890-1234', newMessagesCount: 73 },
  { id: 6, lastName: 'Clark', isOnline: true, phone: '678-901-2345', newMessagesCount: 31 },
  { id: 7, lastName: 'Lee', isOnline: true, phone: '789-012-3456', newMessagesCount: 56 },
  { id: 8, lastName: 'Taylor', isOnline: true, phone: '890-123-4567', newMessagesCount: 24 },
  { id: 9, lastName: 'Martin', isOnline: true, phone: '901-234-5678', newMessagesCount: 98 },
  { id: 10, lastName: 'Allen', isOnline: true, phone: '012-345-6789', newMessagesCount: 11 },
  { id: 11, lastName: 'Walker', isOnline: true, phone: '111-222-3333', newMessagesCount: 63 },
  { id: 12, lastName: 'Scott', isOnline: true, phone: '222-333-4444', newMessagesCount: 37 },
  { id: 13, lastName: 'Young', isOnline: true, phone: '333-444-5555', newMessagesCount: 80 },
  { id: 14, lastName: 'Green', isOnline: true, phone: '444-555-6666', newMessagesCount: 2 },
  { id: 15, lastName: 'Hill', isOnline: true, phone: '555-666-7777', newMessagesCount: 50 }
];



function fixedHeaderContent() {
  return (
    <TableRow>
      <TableCell align="left" style={{ width: 20 }}>ID</TableCell>
      <TableCell align="left" style={{ width: 100 }}>Бот</TableCell>
      <TableCell align="center" style={{ width: 50 }}>Статус</TableCell>
      <TableCell align="center" style={{ width: 110 }}>Новых сообщений</TableCell>
      <TableCell align="center" style={{ width: 90 }}>Действия</TableCell>
    </TableRow>
  );
}

export default function ReactVirtualizedTable() {
  const [bots, setBots] = React.useState<Data[]>(initialRows);
  const [botToDelete, setBotToDelete] = React.useState<Data | null>(null);
  const navigate = useNavigate();

  const handleBotClick = (id: number) => {
    navigate(`/bots/${id}`);
  };

  const handleDelete = (id: number) => {
    setBots((prev) => prev.filter((bot) => bot.id !== id));
    setBotToDelete(null);
  };

  const CustomTableRow: TableComponents<Data>["TableRow"] = ({ item, ...props }) => {
    return (
      <TableRow
        {...props}
        hover
        sx={{ cursor: 'pointer' }}
        onClick={() => handleBotClick(item.id)}
      />
    );
  };

  const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead sx={{ background: 'white' }} {...props} ref={ref} />
    )),
    TableRow: CustomTableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const rowContent = (_index: number, row: Data) => (
    <>

      <TableCell align="left">{row.id}</TableCell>
      <TableCell align="left">{row.lastName}</TableCell>
      <TableCell align="center">
        <Chip
          label={row.isOnline === true ? 'Online' : 'Offline'}
          color={row.isOnline === true ? 'success' : 'error'}
          icon={row.isOnline === true ? <CheckCircle /> : <Cancel />}
          sx={{ width: '100%', justifyContent: 'center' }}
        />
      </TableCell>
      <TableCell align="center">
        {row.newMessagesCount > 0 ? (
          <Chip
            label={row.newMessagesCount}
            color="primary"
            sx={{ width: '100%', justifyContent: 'center' }}
            icon={<MessageRounded />}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">Нет новых</Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          color="error"
          variant="contained"
          sx={{ width: '100%', justifyContent: 'center' }}
          onClick={(e) => {
            e.stopPropagation();
            setBotToDelete(row);
          }}
        >
          Удалить
        </Button>
      </TableCell>
    </>
  );

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <TableVirtuoso
        data={bots}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />

      <Dialog open={!!botToDelete} onClose={() => setBotToDelete(null)}>
        <DialogTitle>Удалить бота?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить бота <strong>{botToDelete?.lastName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBotToDelete(null)} color="primary">
            Отмена
          </Button>
          <Button onClick={() => botToDelete && handleDelete(botToDelete.id)} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
