import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { Link } from "react-router-dom";

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
      console.log(page);

      const response = await getPosts(page, pageSize);
      setPostsData(response);
      setLoading(false);
      console.log(response);

      // }
    } catch (error) {
      setError("Ocorreu um erro ao buscar os posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < postsData.totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="space-y-10 pb-8">
        {loading && <p>Carregando posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && postsData.posts.length === 0 && (
          <p>Nenhum post encontrado.</p>
        )}

        {postsData.posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-2xl border-red-600 bg-[#272525] pb-9 relative transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col justify-center items-start p-4">
              <h2 className="sm:text-2xl sm:font-light md:text-3xl md:font-bold text-white hover:text-red-500 transition duration-300">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <h3 className="sm:text-xs sm:font-light md:text-sm md:font-normal text-gray-400 mt-2 line-clamp-3">
                {post.contentPreview}
              </h3>
              <div className="sm:text-xs sm:font-light md:text-sm md:font-normal text-gray-400 mt-4 absolute bottom-3">
                <span>{post.author}</span> •{" "}
                <span>
                  {post.publishedAt}{" "}
                  {post.updatedAt != null &&
                    `• Atualizado em ${post.updatedAt}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="mb-5">
          <span className="text-white">
            Página {currentPage} de {postsData.totalPages}
          </span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-2xl bg-main text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === postsData.totalPages}
            className={`px-4 py-2 rounded-2xl bg-main text-white ${
              currentPage === postsData.totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
