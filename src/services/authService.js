import axios from "axios";
import config from "../utils/config";
import {jwtDecode} from "jwt-decode";

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

        if(response.data.token){                        
            const decodedToken = jwtDecode(response.data.token);

            const {userId, username, role} = decodedToken;
            const userData = {userId, username, role, token: response.data.token};

            return userData;      
        }


        return null;
    } catch (error) {
        console.error(`Erro ao fazer login: ${error}`);
        throw error;
    }
}