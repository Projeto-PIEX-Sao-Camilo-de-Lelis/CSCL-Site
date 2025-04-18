import axios from "axios";
import config from "../utils/config";


const postApi = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getPosts = async (token, page = 1, pageSize = 5) => {
    try {
        const response = await postApi.get("/posts", {
            headers:{
                Authorization: `Bearer ${token}`,
            },
            params: {
                pageNumber: page,
                pageSize: pageSize
            },  
        });

        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response.data;

    } catch (error) {
        console.error(`Erro ao buscar Posts ${error}`);
        throw error;
    }
}

export const getPost = async (slug) => {
    const response = await postApi.get(`/posts/slug/${slug}`);

    if (response.status !== 200) {
        throw new Error(`Erro ao buscar post: ${response.status}`);
    }
    return response.data;
}



