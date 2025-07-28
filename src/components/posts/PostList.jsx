import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { Link } from "react-router-dom";
import localCacheService from "../../services/localCacheService.js";
import ServiceUnavailable from "../errors/ServiceUnavailable.jsx";

const PostList = () => {
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState(false);
  const [isUsingCache, setIsUsingCache] = useState(false);

  const pageSize = 6;

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
    <div className="w-full min-h-[60vh]">
      {isUsingCache && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 text-lg">📄</span>
            </div>
            <div>
              <p className="text-yellow-100 font-medium">Modo Offline Ativo</p>
              <p className="text-yellow-200/80 text-sm">
                Exibindo dados salvos localmente. Alguns posts podem estar desatualizados.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-600/30 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 text-lg font-medium">Carregando posts...</p>
        </div>
      )}

      {isServiceUnavailable && !loading && (
        <div className="min-h-[40vh]  flex items-center justify-center">
          <ServiceUnavailable onRetry={handleRetry} variant="default" />
        </div>
      )}

      {!loading && !isServiceUnavailable && postsData.posts.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Nenhum post encontrado</h3>
          <p className="text-gray-400 max-w-md">
            Ainda não temos posts publicados. Volte em breve para conferir nossas novidades!
          </p>
        </div>
      )}

      {!loading && !isServiceUnavailable && postsData.posts.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            {postsData.posts.map((post, index) => (
              <article
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
                      Visualizar postagem →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {postsData.totalPages > 1 && (
            <div className="flex flex-col items-center space-y-4 pt-8 border-t border-zinc-700/50">
              <span className="text-gray-400 text-sm">
                Página {currentPage} de {postsData.totalPages}
              </span>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Anterior
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, postsData.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                            : "bg-zinc-700/50 text-gray-400 hover:bg-zinc-600/50 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === postsData.totalPages}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === postsData.totalPages
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  Próxima
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
