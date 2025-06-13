import { apiErrorHandle } from './apiErrorHandler';
import { apiBots } from './config';

export const getBots = async () => {
    try {
        const response = await apiBots.get('/bo2s');
        return response.data;
    } catch (error) {
        apiErrorHandle(error, 'при получении ботов');
    }
};

export const getBotInfo = async (botId: number) => {
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

    const response = await apiBots.post(`/bots`, payload);
    return response.data;
};

export const deleteBot = async (botId: number) => {
    const response = await apiBots.delete(`/bots/${botId}/botinfo`);
    return response.data[0];
};
