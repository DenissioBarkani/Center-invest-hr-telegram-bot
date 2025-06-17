import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotificationStore } from "../store/use-notification-store";
// import { useNotificationStore } from "../store/use-notification-store";

export const NotificationContainer: React.FC = () => {
    const { message, severity, open, autoHideDuration, closeNotification } =
        useNotificationStore();

    return (
        <Snackbar
            role="alert"
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={closeNotification}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={closeNotification}
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
