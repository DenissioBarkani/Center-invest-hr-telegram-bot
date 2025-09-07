import axios from 'axios';

export interface ApiError {
    message: string;
    status?: number;
}

export const handleApiError = (error: unknown): ApiError => {
  // Если это уже обработанная ошибка (наша ApiError)

  // Если это AxiosError
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // Сетевые ошибки
    if (!error.response) {
      return {
        message:
                    'Нет соединения с сервером. Проверьте интернет-соединение.',
      };
    }

    // HTTP ошибки по статус-кодам
    switch (status) {
    case 400:
      return {
        message:
                        responseData?.message || `Неверный запрос к серверу. Ошибка ${status}`,
        status: 400,
      };
    case 401:
      return {
        message: `Необходима авторизация. Войдите в систему. Ошибка ${status}`,
        status: 401,
      };
    case 403:
      return {
        message: `Доступ запрещен. Недостаточно прав. Ошибка ${status}`,
        status: 403,
      };
    case 404:
      return {
        message: `Запрашиваемый ресурс не найден. Ошибка ${status}`,
        status: 404,
      };
    case 409:
      return {
        message:
                        responseData?.message ||
                        `Конфликт данных. Возможно, ресурс уже существует. Ошибка ${status}`,
        status: 409,
      };
    case 422:
      return {
        message:
                        responseData?.message || `Ошибка валидации данных. Ошибка ${status}`,
        status: 422,
      };
    case 429:
      return {
        message: `Слишком много запросов. Попробуйте позже. Ошибка ${status}`,
        status: 429,
      };
    case 500:
      return {
        message: `Внутренняя ошибка сервера. Попробуйте позже. Ошибка ${status}`,
        status: 500,
      };
    case 502:
    case 503:
    case 504:
      return {
        message: `Сервер временно недоступен. Попробуйте позже. Ошибка ${status}`,
        status,
      };
    default:
      return {
        message:
                        responseData?.message ||
                        error.message ||
                        'Неизвестная ошибка сервера.',
        status,
      };
    }
  }

  // Обычные JavaScript ошибки
  if (error instanceof Error) {
    return {
      message:
                error.message || 'Произошла ошибка при выполнении операции.',
    };
  }

  // Неизвестные ошибки
  return {
    message: 'Произошла неизвестная ошибка.',
  };
};
