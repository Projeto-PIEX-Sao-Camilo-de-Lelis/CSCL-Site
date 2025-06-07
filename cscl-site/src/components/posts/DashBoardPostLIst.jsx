import React, { useContext, useEffect, useState } from "react";
import { getPosts, deletePost } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const DashboardPostList = () => {
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [postToDelete, setPostToDelete] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      if (user && user.token) {
        const response = await getPosts(page, pageSize);
        if (response) {
          setPostsData(response);
        }
      }
    } catch (error) {
      setError("Ocorreu um erro ao buscar os posts");
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
      setFeedbackMessage("Erro ao excluir post.");
    } finally {
      setShowFeedbackModal(true);
      setShowConfirmModal(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="space-y-10 min-w-[90vw] min-h-[50vh] relative xl:min-w-[50vw]">
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-lg border border-gray-300">
            <p className="mb-4 text-black">
              Tem certeza que deseja excluir este post?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Excluir
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showFeedbackModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-lg border border-gray-300">
            <p className="mb-4 text-black">{feedbackMessage}</p>
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="px-4 py-2 bg-main text-white rounded hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="whitespace-nowrap text-white text-lg md:text-3xl">
            Carregando posts...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center flex-col space-y-6 pb-8">
            {error && <p className="text-red-500">{error}</p>}
            {!loading && postsData.posts.length === 0 && (
              <p>Nenhum post encontrado.</p>
            )}

            {postsData.posts.map((post) => (
              <div
                key={post.id}
                className="w-full border rounded-2xl border-red-600 bg-[#272525] p-4 relative transition-transform duration-300 hover:scale-105"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold sm:text-xl md:text-2xl text-gray-100 hover:text-red-500 transition duration-300">
                    {post.title}
                  </h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="text-[#ffffff] hover:text-red-700 transition-colors font-semibold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-[#ff4b4b] hover:text-red-700 transition-colors font-semibold"
                    >
                      Excluir
                    </button>
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
        </>
      )}
    </div>
  );
};

export default DashboardPostList;
