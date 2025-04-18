import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";

const PostList = () => {
    const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    //const {user} = useContext(UserContext);

    const fetchPosts = async (page) => {
        setLoading(true);
        try {               
                //if(user && user.token){
                const response = await getPosts( page, pageSize);
                setPostsData(response);
                setLoading(false);
           // }
        } catch (error) {
            setError("Ocorreu um erro ao buscar os posts");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < postsData.totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="space-y-10 pb-8">
                {loading && <p>Carregando posts...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && postsData.posts.length === 0 && <p>Nenhum post encontrado.</p>}

                {postsData.posts.map((post) => (
                    <div
                        key={post.id}
                        className="border-b rounded-2xl border-red-600 bg-gradient-to-r from-black via-gray-950 via-red-950 to-black pb-9 relative transition-transform duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col justify-center items-start p-4">
                            <h2 className="sm:text-2xl sm:font-light md:text-3xl md:font-bold text-gray-100 hover:text-red-500 transition duration-300">
                                <a href={`/blog/${post.slug}`}>{post.title}</a>
                            </h2>
                            <h3 className="sm:text-xs sm:font-light md:text-sm md:font-normal text-gray-500 mt-2 line-clamp-3">{post.contentPreview}</h3>
                            <div className="sm:text-xs sm:font-light md:text-sm md:font-normal text-gray-500 mt-4 absolute bottom-3">
                                <span>{post.author}</span> •{" "}
                                <span>
                                    {post.publishedAt}{" "}
                                    {post.updatedAt != null && `• Atualizado em ${post.updatedAt}`}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-2xl bg-main text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                        }`}
                >
                    Anterior
                </button>
                <span className="text-white">
                    Página {currentPage} de {postsData.totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === postsData.totalPages}
                    className={`px-4 py-2 rounded-2xl bg-main text-white ${currentPage === postsData.totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                        }`}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default PostList;