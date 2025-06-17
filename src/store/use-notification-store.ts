import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';
interface iInitialState {
    id: number;
    message: string;
    severity: NotificationSeverity;
    open: boolean;
    autoHideDuration?: number;
}

interface IActions {
    addNotification: (message: string, severity: NotificationSeverity, autoHideDuration?: number) => void;
    closeNotification: () => void;
}

interface NotificationType extends iInitialState, IActions { }

const initialState: iInitialState = {
    id: 0,
    message: '',
    severity: 'info',
    open: false,
    autoHideDuration: 3000,
};


const NotificationStore: StateCreator<
    NotificationType,
    [['zustand/devtools', never]]
> = (set) => ({
    ...initialState,
    addNotification: (message, severity = 'info', autoHideDuration = 3000) => {
        // set({ isLoading: true }, false, 'initNotification');
        set(
            {
                message,
                severity,
                open: true,
                autoHideDuration
            },
            false,
            'addNotification'
        );
    },
    closeNotification: () => {
        set(
            { open: false },
            false,
            'closeNotification'
        );
    },
});



export const useNotificationStore = create<NotificationType>()(
    devtools(NotificationStore, {
        name: "notification-storage",
    })
);

export const addNotification = (message: string, severity: NotificationSeverity, autoHideDuration?: number) =>
    useNotificationStore.getState().addNotification(message, severity, autoHideDuration);
export const closeNotification = () => useNotificationStore.getState().closeNotification();