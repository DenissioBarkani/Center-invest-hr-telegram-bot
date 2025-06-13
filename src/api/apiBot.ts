import { apiBots } from './config';

export const getBots = async () => {
    const response = await apiBots.get('/bots');
    return response.data;
};

export const getBotInfo = async (botId: number) => {
    const response = await apiBots.get(`/bots/${botId}/botinfo`);
    return response.data[0];
};

export const createNewBot = async (botData: {
    name: string;
    token: string;
    description?: string;
}) => {
    const payload = {
        ...botData,
        isOnline: false,
        newMessagesCount: 0,
        createdAt: Date.now(),
    };

    const response = await apiBots.post(`/bots`, payload);
    return response.data;
};

export const deleteBot = async (botId: number) => {
    const response = await apiBots.delete(`/bots/${botId}/botinfo`);
    return response.data[0];
};
