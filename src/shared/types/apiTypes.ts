export interface Bot {
  botId: string;
  name: string;
  token: string;
  createdAt: string;
  isOnline?: boolean;
  newMessagesCount: number;
}

export interface BotCardInfo {
  botId: number;
  name: string;
  token: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}


export interface UserInfo {
  userId: string; // Уникальный идентификатор пользователя в Telegram
  username: string; // Username пользователя
}

export interface QuestionType {
  id: string;
  botId: string; // UUID
  text: string;
  // description?: string;
  // helpMessage?: string;
  answers?: string[];
}


export interface UserAnswer {
  id: string;
  userId: string;
  username: string;
  response: string | string[];
  date: string;
}

export interface Answers {
  questionId: string;
  botId: string;
  title: string;
  countResponse: number,
  newResponse: number
  answers: UserAnswer[];
}

