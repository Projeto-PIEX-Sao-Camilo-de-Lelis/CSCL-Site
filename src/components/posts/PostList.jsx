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
          postsData.posts.map((post, index) => (
            <div
              key={post.id}
              className={`
                group w-[80vw] border rounded-2xl border-red-600/30 bg-gradient-to-br 
                from-[#272525] to-[#1a1818] p-6 relative transition-all duration-500 
                hover:scale-[1.02] hover:shadow-2xl hover:border-red-600/60
                hover:-translate-y-2 hover:z-10
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex flex-col justify-center items-start">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="flex flex-row text-xs text-gray-400">
                    <span>Atualizado em {post.updatedAt ?? post.publishedAt}</span>
                  </div>
                </div>

                <h2 className="sm:text-2xl md:text-3xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:underline decoration-red-400 underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </h2>

                <h3 className="text-base md:text-lg text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {post.contentPreview}
                </h3>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        <img
                          src="/assets/icons/logo4.png"
                          alt="Logo da Casa São Camillo de Lelis"
                          className="w-8 h-8 md:w-8 md:h-8 object-contain"
                        />
                      </span>
                    </div>
                    <span>{post.author}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="hidden sm:block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Ler post →
                  </Link>
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
