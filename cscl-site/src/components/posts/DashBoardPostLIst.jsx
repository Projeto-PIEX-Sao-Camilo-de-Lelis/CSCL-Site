import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../../services/postService.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const DashboardPostList = () => {
  const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    }
  };

  const handleNextPage = () => {
    if (currentPage < postsData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleEdit = (postId) => {
    // Implementar edição
    console.log("Editando post:", postId);
  };

  const handleDelete = (postId) => {
    // Implementar deleção
    console.log("Deletando post:", postId);
  };

  return (
    <div className="space-y-10 min-w-[90vw] min-h-[50vh] relative xl:min-w-[50vw]">
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
                className="w-full border-b rounded-2xl border-red-600 bg-gradient-to-r from-black via-gray-950 via-red-950 to-black p-4 relative transition-transform duration-300 hover:scale-105"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold sm:text-xl md:text-2xl text-gray-100">
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
