import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../services/postService";

export default function ViewPostPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageHtml, setImageHtml] = useState("");
  const [textHtml, setTextHtml] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setError(false);
        const data = await getPost(slug);
        setPost(data);

        if (data && data.content) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.content, "text/html");
          const img = doc.querySelector("img");
          let imgHtml = "";
          let textHtml = data.content;

          if (img) {
            imgHtml = img.outerHTML;
            img.remove();
            textHtml = doc.body.innerHTML;
          }
          setImageHtml(imgHtml);
          setTextHtml(textHtml);
        }
      } catch (error) {
        console.error("Erro ao carregar post:", error);
        setPost(null);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

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

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-secondary">
      <Menu />

      <div className="relative w-full bg-gradient-to-br from-main via-main/95 to-red-800 text-whiteColor overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 py-12">
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
              <span className="text-sm font-medium">VISUALIZAR POSTAGEM</span>
            </div>
            <div className="w-20"></div>
          </div>

          {!loading && post && (
            <div className="max-w-4xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{post.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.publishedAt}</span>
                </div>

                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Atualizado em {post.updatedAt}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary transform -skew-y-1 origin-bottom-left"></div>
      </div>

      <div className="flex-1 bg-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-red-600/30 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-white/80 text-lg font-medium">Carregando post...</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Post não encontrado</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  O post que você está procurando não existe ou foi removido.
                </p>
                <button
                  onClick={() => navigate("/blog")}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-300"
                >
                  Ver todos os posts
                </button>
              </div>
            )}

            {!loading && !error && post && (
              <article className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
                {imageHtml && (
                  <div className="w-full bg-zinc-900/50 flex items-center justify-center">
                    <div
                      className="w-full max-w-full flex justify-center"
                      dangerouslySetInnerHTML={{ __html: imageHtml }}
                      style={{
                        "& img": {
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "contain",
                          display: "block",
                          margin: "0 auto",
                        },
                      }}
                    />
                  </div>
                )}

                <div className="p-8 md:p-12">
                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:text-white prose-headings:font-bold
                      prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-justify
                      prose-strong:text-white prose-strong:font-semibold
                      prose-em:text-gray-200
                      prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300 prose-a:transition-colors
                      prose-ul:text-gray-200 prose-ol:text-gray-200
                      prose-li:text-gray-200 prose-li:leading-relaxed
                      prose-blockquote:border-l-red-500 prose-blockquote:bg-red-500/10 prose-blockquote:pl-4 prose-blockquote:py-3
                      prose-blockquote:text-gray-200 prose-blockquote:italic
                      prose-code:bg-zinc-700 prose-code:text-yellow-400 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                      prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-600 prose-pre:text-gray-200
                      prose-table:text-gray-200 prose-th:text-white prose-th:font-semibold prose-th:bg-zinc-700/50
                      prose-td:border-zinc-600 prose-th:border-zinc-600
                      prose-hr:border-zinc-600
                      [&>*]:text-gray-200 [&_*]:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: textHtml }}
                  />

                  <div className="mt-12 pt-8 border-t border-zinc-700/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-100 rounded-full flex items-center justify-center">
                          <img
                            src="/assets/icons/logo4.png"
                            alt="Logo da Casa São Camilo de Lelis"
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium">{post.author}</p>
                          <p className="text-gray-400 text-sm">Casa São Camilo de Lelis</p>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/blog")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-300"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Ver mais posts
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
