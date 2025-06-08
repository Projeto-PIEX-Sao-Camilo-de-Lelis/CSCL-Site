import axios from "axios";
import config from "../utils/config";

const getToken = () => {
    const userString = localStorage.getItem('user');
    if (!userString) return null;

    try {
        const userData = JSON.parse(userString);
        return userData.token;
    } catch (error) {
        console.error('Ocorreu um erro ao tentar interpretar o token.', error);
        return null;
    }
};

const visitorApi = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const recordVisit = async (pageUrl) => {
    try {
        const token = getToken();
        await visitorApi.post("/visitors/record", {
            pageUrl: pageUrl,
        }, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        console.log(`Visita registrada para a URL: ${pageUrl}`);
    } catch (error) {
        console.error(`Erro ao registrar visita: ${error}`);
    }
};

export const getVisitorCount = async () => {
    try {
        const token = getToken();
        const response = await visitorApi.get("/visitors/count", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar contagem de visitantes:", error);
        return 0;
    }
};

export const getVisitorsByCountry = async () => {
    try {
        const token = getToken();
        const response = await visitorApi.get("/visitors/by-country", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar visitantes por país:", error);
        return {};
    }
};

export const getVisitorsByDate = async (startDate, endDate) => {
    try {
        const token = getToken();
        const response = await visitorApi.get("/visitors/by-date", {
            params: { startDate, endDate },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar visitantes por data:", error);
        return {};
    }
};