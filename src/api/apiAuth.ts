import { apiAuth } from "./config";

export const fetchLogin = async(email: string, password: string) => {
    const response = await apiAuth.post('', {
        email,
        password
    })
    return response.data
}