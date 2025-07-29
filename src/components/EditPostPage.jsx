import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import TipTapEditor from "./tiptap/TipTapEditor";
import { ArrowLeft, FileText, Check, Save, Eye, Calendar, User, Clock } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [originalPost, setOriginalPost] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const updateWordCount = (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    updateWordCount(newContent);
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setOriginalPost(post);
        updateWordCount(post.content);
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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

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

      if (title.length > 100) {
        setFeedbackMessage("O título deve ter no máximo 100 caracteres.");
        setShowFeedbackModal(true);
        return;
      }

      await updatePost(user.token, id, { title, content });
      setFeedbackMessage("Post atualizado com sucesso!");
      setShowFeedbackModal(true);
    } catch (error) {
      setFeedbackMessage("Erro ao atualizar post. Tente novamente.");
      setShowFeedbackModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowFeedbackModal(false);
    if (feedbackMessage === "Post atualizado com sucesso!") {
      navigate("/dashboard");
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const saveDraft = () => {
    const draft = { title, content, timestamp: new Date().toISOString() };
    localStorage.setItem(`editPost_draft_${id}`, JSON.stringify(draft));
    setFeedbackMessage("Alterações salvas localmente!");
    setShowFeedbackModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    if (originalPost) {
      const savedDraft = localStorage.getItem(`editPost_draft_${id}`);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          setTitle(draft.title || originalPost.title);
          setContent(draft.content || originalPost.content);
          updateWordCount(draft.content || originalPost.content);
        } catch (error) {
          console.error("Erro ao carregar rascunho:", error);
        }
      }
    }
  }, [originalPost, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-secondary">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-600/30 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white/80 text-lg font-medium">Carregando post para edição...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-secondary">
      <Menu />

      <div className="relative w-full bg-gradient-to-br from-main via-main/95 to-red-800 text-whiteColor overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="hidden sm:inline">Voltar</span>
              </button>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">EDIÇÃO DE CONTEÚDO</span>
              </div>
              <div className="w-20"></div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Editar <span className="text-yellow-400">Postagem</span>
            </h1>

            <p className="text-md md:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
              Faça as alterações necessárias em sua postagem. Todas as mudanças serão salvas
              automaticamente no servidor.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary transform -skew-y-1 origin-bottom-left"></div>
      </div>

      <div className="flex-1 bg-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-zinc-800/30 to-zinc-700/30 backdrop-blur-sm border border-zinc-600/30 rounded-xl p-4 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Palavras: {wordCount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      Autor: {originalPost?.author || user?.username || "Usuário"}
                    </span>
                  </div>
                  {originalPost?.createdAt && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Criado: {originalPost.createdAt}</span>
                    </div>
                  )}
                  {originalPost?.updatedAt && originalPost.updatedAt !== originalPost.createdAt && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Última edição: {originalPost.updatedAt}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={saveDraft}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Salvar rascunho</span>
                  </button>

                  <button
                    onClick={togglePreview}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      showPreview
                        ? "bg-green-600/20 border border-green-500/30 text-green-400"
                        : "bg-gray-600/20 border border-gray-500/30 text-gray-400 hover:bg-gray-600/30"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {showPreview ? "Continuar editando" : "Pré-visualizar"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-b border-zinc-700/50 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {showPreview ? "Pré-visualização das Alterações" : "Editar Postagem"}
                    </h2>
                    <p className="text-gray-400">
                      {showPreview
                        ? "Veja como sua postagem ficará após as alterações"
                        : "Faça as modificações necessárias nos campos abaixo"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {!showPreview ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-white text-lg font-semibold">Título</label>
                        <span
                          className={`text-sm ${
                            title.length > 80 ? "text-yellow-400" : "text-gray-400"
                          }`}
                        >
                          {title.length}/100
                        </span>
                      </div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título do post"
                        maxLength={100}
                        className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-white text-lg font-semibold">Conteúdo</label>
                      <div className="bg-zinc-800/30 border border-zinc-600/50 rounded-xl overflow-hidden">
                        <TipTapEditor content={content} onChange={handleContentChange} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-zinc-700/50">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Salvando alterações...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span>Salvar alterações</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                        {title || "Título da postagem aparecerá aqui"}
                      </h1>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span>Por {originalPost?.author || user?.username || "Autor"}</span>
                        <span>•</span>
                        <span>
                          {originalPost?.createdAt ? originalPost.createdAt : "Data de criação"}
                        </span>
                        {originalPost?.updatedAt &&
                          originalPost.updatedAt !== originalPost.createdAt && (
                            <>
                              <span>•</span>
                              <span>Atualizado em {originalPost.updatedAt}</span>
                            </>
                          )}
                      </div>
                    </div>

                    <div className="border-t border-zinc-700/50 pt-6">
                      <div
                        className="prose prose-lg max-w-none prose-invert prose-blue"
                        dangerouslySetInnerHTML={{
                          __html:
                            content ||
                            "<p class='text-gray-400 italic'>O conteúdo editado da postagem aparecerá aqui...</p>",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFeedbackModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  feedbackMessage.includes("sucesso") ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                {feedbackMessage.includes("sucesso") ? (
                  <Check className="w-8 h-8 text-green-400" />
                ) : (
                  <FileText className="w-8 h-8 text-red-400" />
                )}
              </div>
              <p className="text-white mb-6 text-lg">{feedbackMessage}</p>
              <button
                onClick={handleCloseModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
              >
                {feedbackMessage.includes("sucesso") ? "Ir para Dashboard" : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
