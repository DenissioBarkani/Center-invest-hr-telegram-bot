import type { AxiosError } from "axios";
import axios from "axios";

export const apiErrorHandle = (error: unknown, context: string): Error => {
    let errorMessage = `Ошибка ${context}`;

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            errorMessage += `: ${axiosError.response.status} - ${axiosError.response.statusText}`;
            if (axiosError.response.data) {
                errorMessage += ` (${JSON.stringify(axiosError.response.data)})`;
            }
        } else if (axiosError.request) {
            errorMessage += ': Сервер не отвечает';
        } else {
            errorMessage += `: ${axiosError.message}`;
        }
    } else if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
    } else {
        errorMessage += ': Неизвестная ошибка';
    }

    console.error(`[API Error] ${errorMessage}`, error);
    return new Error(errorMessage);
};