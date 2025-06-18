import { Cancel, CheckCircle, MessageRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TableComponents } from 'react-virtuoso';
import { TableVirtuoso } from 'react-virtuoso';
import { getBots } from '../api/apiBot.ts';
import { type ApiError } from '../api/errorHandler.ts';
import { addNotification } from '../store/use-notification-store.ts';

interface Data {
  id: string;
  name: string;
  isOnline: boolean;
  newMessagesCount: number;
}

//
// {
//   "id": "15",
//   "name": "Hill",
//   "isOnline": true,
//   "newMessagesCount": 50,
// }

// const initialRows: Data[] = [
//   { id: 1, name: 'Smith', isOnline: true, phone: '123-456-7890', newMessagesCount: 42 },
//   { id: 2, name: 'Johnson', isOnline: true, phone: '234-567-8901', newMessagesCount: 17 },
//   { id: 3, name: 'Brown', isOnline: true, phone: '345-678-9012', newMessagesCount: 0 },
//   { id: 4, name: 'White', isOnline: true, phone: '456-789-0123', newMessagesCount: 5 },
//   { id: 5, name: 'Davis', isOnline: true, phone: '567-890-1234', newMessagesCount: 73 },
//   { id: 6, name: 'Clark', isOnline: true, phone: '678-901-2345', newMessagesCount: 31 },
//   { id: 7, name: 'Lee', isOnline: true, phone: '789-012-3456', newMessagesCount: 56 },
//   { id: 8, name: 'Taylor', isOnline: true, phone: '890-123-4567', newMessagesCount: 24 },
//   { id: 9, name: 'Martin', isOnline: true, phone: '901-234-5678', newMessagesCount: 98 },
//   { id: 10, name: 'Allen', isOnline: true, phone: '012-345-6789', newMessagesCount: 11 },
//   { id: 11, name: 'Walker', isOnline: true, phone: '111-222-3333', newMessagesCount: 63 },
//   { id: 12, name: 'Scott', isOnline: true, phone: '222-333-4444', newMessagesCount: 37 },
//   { id: 13, name: 'Young', isOnline: true, phone: '333-444-5555', newMessagesCount: 80 },
//   { id: 14, name: 'Green', isOnline: true, phone: '444-555-6666', newMessagesCount: 2 },
//   { id: 15, name: 'Hill', isOnline: true, phone: '555-666-7777', newMessagesCount: 50 }
// ];

// Выносим компоненты из рендера
const CustomTableRow: TableComponents<Data>['TableRow'] = ({
  // eslint-disable-next-line react/prop-types
  item,
  ...props
}) => {
  const navigate = useNavigate();

  const handleBotClick = (id: string) => {
    navigate(`/bots/${id}`);
  };

  return (
    <TableRow
      {...props}
      hover
      sx={{ cursor: 'pointer' }}
      // eslint-disable-next-line react/prop-types
      onClick={() => handleBotClick(item.id)}
    />
  );
};

const SkeletonRow = () => (
  <>
    <TableCell>
      <Skeleton variant="text" height={30} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" height={30} width="80%" />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width="100%" height={30} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width="100%" height={30} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width="100%" height={30} />
    </TableCell>
  </>
);

const RowContent = ({
  row,
  onDeleteClick,
}: {
  row: Data;
  onDeleteClick: (row: Data) => void;
}) => (
  <>
    <TableCell align="left">{row.id}</TableCell>
    <TableCell align="left">{row.name}</TableCell>
    <TableCell align="center">
      <Chip
        label={row.isOnline === true ? 'Online' : 'Offline'}
        color={row.isOnline === true ? 'success' : 'error'}
        icon={row.isOnline === true ? <CheckCircle /> : <Cancel />}
        sx={{
          width: '100%',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      />
    </TableCell>
    <TableCell align="center">
      {row.newMessagesCount > 0 ? (
        <Chip
          label={row.newMessagesCount}
          color="primary"
          icon={<MessageRounded />}
          sx={{
            width: '100%',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Нет новых
        </Typography>
      )}
    </TableCell>
    <TableCell align="center">
      <Button
        color="error"
        variant="contained"
        sx={{ width: '100%', justifyContent: 'center' }}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(row);
        }}
      >
        Удалить
      </Button>
    </TableCell>
  </>
);

function fixedHeaderContent() {
  return (
    <TableRow>
      <TableCell align="left" style={{ width: 20 }}>
        ID
      </TableCell>
      <TableCell align="left" style={{ width: 100 }}>
        Бот
      </TableCell>
      <TableCell align="center" style={{ width: 50 }}>
        Статус
      </TableCell>
      <TableCell align="center" style={{ width: 110 }}>
        Новых сообщений
      </TableCell>
      <TableCell align="center" style={{ width: 90 }}>
        Действия
      </TableCell>
    </TableRow>
  );
}

// Выносим компоненты таблицы за пределы основного компонента
const ScrollerComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer component={Paper} {...props} ref={ref} />
));

const TableComponent = (props: any) => (
  <Table
    {...props}
    sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
  />
);

const TableHeadComponent = React.forwardRef<HTMLTableSectionElement>(
  (props, ref) => (
    <TableHead sx={{ background: 'white' }} {...props} ref={ref} />
  )
);

const TableBodyComponent = React.forwardRef<HTMLTableSectionElement>(
  (props, ref) => <TableBody {...props} ref={ref} />
);

const ReactVirtualizedTable = () => {
  const [bots, setBots] = React.useState<Data[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [botToDelete, setBotToDelete] = React.useState<Data | null>(null);

  const navigate = useNavigate();

  const handleBotClick = (id: string) => {
    navigate(`/bots/${id}`);
  };

  const handleDelete = (id: string) => {
    setBots((prev) => prev.filter((bot) => bot.id !== id));
    setBotToDelete(null);
  };

  const handleDeleteClick = (row: Data) => {
    setBotToDelete(row);
  };

  const fetchBots = async () => {
    setIsLoading(true);
    try {
      const data = await getBots();
      setBots(data);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      addNotification(apiError.message, 'error', 6000);
      setBots([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBots();
  }, []);

  const VirtuosoTableComponents: TableComponents<Data> = React.useMemo(
    () => ({
      Scroller: ScrollerComponent,
      Table: TableComponent,
      TableHead: TableHeadComponent,
      TableRow: CustomTableRow,
      TableBody: TableBodyComponent,
    }),
    []
  );

  const rowContent = React.useCallback(
    (_index: number, row: Data) => (
      <RowContent row={row} onDeleteClick={handleDeleteClick} />
    ),
    []
  );

  const skeletonRows = React.useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => ({
        id: String(index),
        name: '',
        isOnline: false,
        newMessagesCount: 0,
      })),
    []
  );

  const getItemContent = (loadingState: boolean) =>
    (loadingState
      ? () => <SkeletonRow />
      : rowContent);

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      {!isLoading && bots.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6" color="error">
            Ошибка загрузки
          </Typography>
        </Box>
      ) : (
        <TableVirtuoso
          data={isLoading ? skeletonRows : bots}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={getItemContent(isLoading)}
        />
      )}

      <Dialog open={!!botToDelete} onClose={() => setBotToDelete(null)}>
        <DialogTitle>Удалить бота?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить бота{' '}
            <strong>{botToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setBotToDelete(null)}
            color="primary"
          >
            Отмена
          </Button>
          <Button
            onClick={() =>
              botToDelete && handleDelete(botToDelete.id)}
            color="error"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReactVirtualizedTable;
