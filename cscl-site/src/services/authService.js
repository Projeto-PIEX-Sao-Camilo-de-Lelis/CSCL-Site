import axios from "axios";
import config from "../utils/config";

const postApi = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default async function login(email, password) {
    try {
        const response = await postApi.post("/auth/login", {
            email,
            password,
        });

        return {
            token: response.data.token,
            data: response.data,
        };
    } catch (error) {
        console.error(`Erro ao fazer login: ${error}`);
        throw error;
    }
}