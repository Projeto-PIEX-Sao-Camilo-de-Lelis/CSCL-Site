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

export const uploadImage = async (token, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await postApi.post("/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Erro ao fazer upload da imagem: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Erro ao fazer upload da imagem: ${error}`);
        throw error;
    }
}


    export const createBlogPost = async (token, postData) => {
    try {
        const response = await postApi.post("/posts", postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 201) {
            throw new Error(`Erro ao criar post: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Erro ao criar post: ${error}`);
        throw error;
    }

    }