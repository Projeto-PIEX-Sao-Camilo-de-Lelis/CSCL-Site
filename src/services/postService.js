import axios from "axios";
import config from "../utils/config";

const postApi = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPost = async (slug) => {
  try {
    const response = await postApi.get(`/posts/slug/${slug}`);

    if (response.status !== 200) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // console.error(`Erro ao buscar Posts ${error}`);
    throw error;
  }
};

export const getPosts = async (page = 1, pageSize = 5) => {
  try {
    const response = await Promise.race([
      postApi.get("/posts", {
        params: {
          pageNumber: page,
          pageSize: pageSize,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      )
    ]);

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar posts: ${response.status}`);
    }

    return response.data;

  } catch (error) {
    // console.error('Erro ao buscar posts:', error.message);

    return {
      isServiceUnavailable: true,
      error: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
      posts: [],
      totalPages: 0
    };
  }
};

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

    if (![200, 201, 204].includes(response.status)) {
      throw new Error(`Erro ao fazer upload da imagem: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Erro ao fazer upload da imagem: ${error}`);
    throw error;
  }
};

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
};

export const getPostById = async (id) => {
  try {
    const response = await postApi.get(`/posts/${id}`);
    if (response.status !== 200) {
      throw new Error(`Erro ao buscar post: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar post por ID: ${error}`);
    throw error;
  }
};

export const updatePost = async (token, id, postData) => {
  try {
    const response = await postApi.put(`/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (![200, 204].includes(response.status)) {
      throw new Error(`Erro ao atualizar post: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar post: ${error}`);
    throw error;
  }
};

export const deletePost = async (token, id) => {
  try {
    const response = await postApi.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (![200, 204].includes(response.status)) {
      throw new Error(`Erro ao excluir post: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir post: ${error}`);
    throw error;
  }
};
