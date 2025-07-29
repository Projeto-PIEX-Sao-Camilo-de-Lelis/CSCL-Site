import React, { useContext, useEffect, useState } from "react";
import { getPosts, deletePost } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import localCacheService from "../../services/localCacheService.js";
import ServiceUnavailable from "../errors/ServiceUnavailable.jsx";
import { Edit3, Trash2, Calendar, AlertTriangle, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPostList = () => {
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [isServiceUnavailable, setIsServiceUnavailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [postToDelete, setPostToDelete] = useState(null);
  const [isUsingCache, setIsUsingCache] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchPosts = async (page) => {
    setLoading(true);
    setIsServiceUnavailable(false);
    setIsUsingCache(false);

    try {
      if (user && user.token) {
        const response = await getPosts(page, pageSize);

        if (response.isServiceUnavailable) {
          setIsServiceUnavailable(true);
          setPostsData({ posts: [], totalPages: 0 });
          return;
        }

        if (response) {
          setPostsData(response);

          const cacheInfo = localCacheService.getCacheInfo();
          if (cacheInfo && cacheInfo.hasData) {
            setIsUsingCache(!cacheInfo.isValid);
          }
        }
      }
    } catch (error) {
      console.error("Erro inesperado ao buscar posts:", error);
      setIsServiceUnavailable(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchPosts(currentPage);
  }, [currentPage, user]);

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

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = (postId) => {
    setPostToDelete(postId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!user || !user.token) {
      setFeedbackMessage("Você precisa estar logado para excluir um post.");
      setShowFeedbackModal(true);
      setShowConfirmModal(false);
      return;
    }
    try {
      await deletePost(user.token, postToDelete);
      setFeedbackMessage("Post excluído com sucesso!");
      fetchPosts(currentPage);
    } catch (error) {
      setFeedbackMessage("Erro ao excluir post. Tente novamente.");
    } finally {
      setShowFeedbackModal(true);
      setShowConfirmModal(false);
      setPostToDelete(null);
    }
  };

  const handleRetry = () => {
    fetchPosts(currentPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 w-full relative">
      {isUsingCache && (
        <div className="w-full p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-yellow-200">
              Dados em cache local - alguns posts podem estar desatualizados
            </p>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirmar Exclusão</h3>
              <p className="text-gray-400 mb-6">
                Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-xl font-medium hover:bg-zinc-600 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFeedbackModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white mb-6">{feedbackMessage}</p>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500 border-t-transparent"></div>
            <p className="text-white text-lg">Carregando posts...</p>
          </div>
        </div>
      ) : (
        <>
          {isServiceUnavailable && (
            <ServiceUnavailable
              onRetry={handleRetry}
              message="O painel administrativo está temporariamente indisponível. Verifique sua conexão e tente novamente."
              variant="default"
            />
          )}

          {!isServiceUnavailable && (
            <div className="space-y-6">
              {postsData.posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg">Nenhum post encontrado</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Crie sua primeira postagem para começar
                  </p>
                </div>
              ) : (
                postsData.posts.map((post) => (
                  <div
                    key={post.id}
                    className="group bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                          <Link to={{ pathname: `/blog/${post.slug}` }} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        {post.createdAt && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Criado em {post.createdAt}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(post.id)}
                          disabled={isUsingCache}
                          className="group/btn flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                          title={
                            isUsingCache
                              ? "Edição desabilitada durante uso de cache"
                              : "Editar post"
                          }
                        >
                          <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                          <span className="hidden sm:inline">Editar</span>
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={isUsingCache}
                          className="group/btn flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                          title={
                            isUsingCache
                              ? "Exclusão desabilitada durante uso de cache"
                              : "Excluir post"
                          }
                        >
                          <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                          <span className="hidden sm:inline">Excluir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!isServiceUnavailable && postsData.posts.length > 0 && (
            <div className="flex flex-col items-center space-y-4 pt-8">
              <div className="text-gray-400 text-sm">
                Página {currentPage} de {postsData.totalPages}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-gradient-to-r from-zinc-700 to-zinc-600 text-white rounded-xl font-medium hover:from-zinc-600 hover:to-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Anterior
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === postsData.totalPages}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPostList;
