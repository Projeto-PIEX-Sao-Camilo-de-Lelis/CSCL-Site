import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import TipTapEditor from "./tiptap/TipTapEditor";
import { getPostById, updatePost } from "../services/postService";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        setFeedbackMessage("Erro ao carregar post para edição.");
        setShowFeedbackModal(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (!user || !user.token) {
        setFeedbackMessage("Você precisa estar logado para editar um post.");
        setShowFeedbackModal(true);
        return;
      }
      if (!title || !content) {
        setFeedbackMessage("Título e conteúdo são obrigatórios.");
        setShowFeedbackModal(true);
        return;
      }
      await updatePost(user.token, id, { title, content });
      setFeedbackMessage("Post atualizado com sucesso!");
      setShowFeedbackModal(true);
    } catch (error) {
      setFeedbackMessage("Erro ao atualizar post.");
      setShowFeedbackModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowFeedbackModal(false);
    if (feedbackMessage === "Post atualizado com sucesso!") {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
        <Menu />
        <span className="text-white m-10">Carregando...</span>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
      <Menu />
      <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor">
        <h1 className="text-center w-full text-2xl m-7">Editar Post</h1>
      </div>

      <div className="flex flex-col justify-center items-center min-w-[40vw] bg-[#272525] md:min-w-[60vw] p-8 rounded-2xl shadow-lg mt-8 mb-8">
        <label className="text-white text-[1.5rem] mb-4">Título</label>
        <input
          className="w-full h-[50px] text-white text-[1.2rem] p-3 rounded-lg mb-6 border border-white bg-transparent"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-white text-[1.5rem] mb-4">Conteúdo</label>
        <div className="w-full h-[70vh] mb-6">
          <TipTapEditor content={content} onChange={setContent} />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-main text-white text-[1.2rem] rounded-lg hover:bg-red-700 transition duration-300 mt-5"
          >
            Salvar
          </button>
        </div>
      </div>

      {showFeedbackModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-lg border border-gray-300">
            <p className="mb-4 text-black">{feedbackMessage}</p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-main text-white rounded hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
