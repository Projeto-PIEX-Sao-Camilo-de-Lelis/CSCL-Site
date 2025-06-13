import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import TipTapEditor from "./tiptap/TipTapEditor";
import { ArrowLeft } from "lucide-react";
import { createBlogPost } from "../services/postService";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (!user || !user.token) {
                setFeedbackMessage("Você precisa estar logado para criar um post.");
                setShowFeedbackModal(true);
                return;
            }

            if (!title || !content) {
                setFeedbackMessage("Título e conteúdo são obrigatórios.");
                setShowFeedbackModal(true);
                return;
            }

            const postData = { title, content };
            await createBlogPost(user.token, postData);
            setFeedbackMessage("Post criado com sucesso!");
            setShowFeedbackModal(true);
        } catch (error) {
            setFeedbackMessage("Erro ao criar post.");
            setShowFeedbackModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowFeedbackModal(false);
        if (feedbackMessage === "Post criado com sucesso!") {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
            <Menu />
            <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor">
                <h1 className="text-center w-full text-2xl m-7">Criar Post</h1>
            </div>

            <div className="self-start ml-4 mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex text-whiteflex gap-2 text-white hover:text-main transition"
                >
                    <ArrowLeft className="mr-2" />
                </button>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[40vw] bg-[#272525] md:min-w-[60vw] p-8 rounded-2xl shadow-lg mt-8 mb-8">
                <label className="text-white text-[1.5rem] mb-4">Título</label>
                <input
                    className="w-full h-[50px] text-white text-[1.2rem] p-3 rounded-lg mb-6 border border-white bg-transparent"
                    type="text"
                    placeholder="Digite o título do post"
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
                        Postar
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