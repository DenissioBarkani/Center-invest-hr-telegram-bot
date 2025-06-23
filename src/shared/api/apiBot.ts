// import { apiErrorHandle } from './apiErrorHandler';
import axios from 'axios';
import { apiBots } from './config.ts';

export const getBots = async () => {
  const response = await apiBots.get('/bots');
  return response.data;
};

export const getBotInfo = async (botId: string) => {
  const response = await apiBots.get(`/bots/${botId}/botinfo`);
  return response.data[0];
};

// поменять botData когда будет не фэйк api
export const createNewBot = async (botData: {
  id: string;
  name: string;
  isOnline: boolean;
  newMessagesCount: number;
  createdAt: number;
  // token: string;
  // description?: string;
}) => {
  // name: data.name.trim(),
  //             id: Date.now().toString(),
  //             isOnline: false,
  //             newMessagesCount: 0,
  //             createdAt: Date.now(),
  const payload = {
    ...botData,
    // name: botData.name.trim(),
    // id: Date.now().toString(),
    // isOnline: false,
    // newMessagesCount: 0,
    // createdAt: Date.now(),
  };

  const response = await apiBots.post('/bots', payload);
  return response.data;
};


export interface UpdateBotProps {
  // id: string,
  name: string,
  botId: number;
  token: string;
  description: string;
  isActive: boolean;

}

export const updateBot = async (botId: number, updatedFields: Partial<UpdateBotProps>) => {
  const response = await apiBots.put(`/bots/${botId}`, updatedFields);
  return response.data;
};

export const deleteBot = async (botId: number) => {
  // const response = await apiBots.delete(`/bots/${botId}/botinfo`);
  // return response.data[0];
};


export const getResponses = async (botId: number) => {
  const response = await axios.get(`http://localhost:3006/responses?botId=${botId}`);
  return response.data;
};

// GET http://localhost:3006/responses?botId=1

// GET http://localhost:3006/answers?questionId=q1onses
