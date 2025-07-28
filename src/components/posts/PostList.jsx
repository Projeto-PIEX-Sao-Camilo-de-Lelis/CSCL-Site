import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { Link } from "react-router-dom";
import localCacheService from "../../services/localCacheService.js";
import ServiceUnavailable from "../errors/ServiceUnavailable.jsx";

const PostList = () => {
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUsingCache, setIsUsingCache] = useState(false);
  const pageSize = 5;

  const fetchPosts = async (page) => {
    setLoading(true);
    setIsServiceUnavailable(false);
    setIsUsingCache(false);

    try {
      const response = await getPosts(page, pageSize);

      if (response.isServiceUnavailable) {
        setIsServiceUnavailable(true);
        setPostsData({ posts: [], totalPages: 0 });
        return;
      }

      setPostsData(response);

      const cacheInfo = localCacheService.getCacheInfo();
      if (cacheInfo && cacheInfo.hasData) {
        setIsUsingCache(!cacheInfo.isValid);
      }
    } catch (error) {
      console.error("Erro inesperado ao buscar posts:", error);
      setIsServiceUnavailable(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
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

  const handleRetry = () => {
    fetchPosts(currentPage);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {isUsingCache && (
        <div className="w-[80vw] mb-4 p-3 bg-yellow-600 text-white rounded-lg text-center">
          <p className="text-sm">
            📄 Exibindo dados em cache local. Alguns posts podem estar desatualizados.
          </p>
        </div>
      )}

      <div className="space-y-10 pb-8">
        {loading && (
          <div className="flex flex-col items-center space-y-2">
            <p className="text-white">Carregando posts...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {isServiceUnavailable && (
          <div className="w-[80vw]">
            <ServiceUnavailable onRetry={handleRetry} variant="default" />
          </div>
        )}

        {!loading && !isServiceUnavailable && postsData.posts.length === 0 && (
          <p className="text-white text-center">Nenhum post encontrado.</p>
        )}

        {!loading &&
          !isServiceUnavailable &&
          postsData.posts.map((post) => (
            <div
              key={post.id}
              className="w-[80vw] h-[20vh] md:min-h-[200px] border rounded-2xl border-red-600 bg-[#272525] pb-9 relative transition-transform duration-300 hover:scale-105"
            >
              <div className="flex flex-col justify-center items-start p-4">
                <h2 className="sm:text-2xl sm:font-light md:text-3xl md:font-bold text-white hover:text-red-500 transition duration-300">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <h3 className="text-xs sm:font-light md:text-xl md:font-normal text-gray-400 mt-2 line-clamp-3">
                  {post.contentPreview}
                </h3>
                <div className="text-xs sm:font-light md:text-xl md:font-normal text-gray-400 mt-4 absolute bottom-3">
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

      {!loading && !isServiceUnavailable && postsData.posts.length > 0 && (
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
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
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
      )}
    </div>
  );
};

export default PostList;
