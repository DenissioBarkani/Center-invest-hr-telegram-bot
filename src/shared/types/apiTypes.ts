export interface BotShortType {
  id: string;
  name: string;
  isOnline?: boolean;
  newMessagesCount: number;
}

export interface BotCardInfoType {
  id: number;
  name: string;
  token: string;
  description: string;
  isOnline: boolean;
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

