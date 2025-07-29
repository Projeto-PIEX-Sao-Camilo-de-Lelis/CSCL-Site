import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import login from "../services/authService";
import Footer from "./footer/Footer";
import Field from "./input/Field";
import Menu from "./menu/Menu";
import { validateEmail } from "../utils/emailValidator";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErros] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authContext } = useContext(UserContext);

  async function handleLogin() {
    try {
      if (!email || !password) {
        setErros("E-mail e senha são de preenchimento obrigatório.");
        return;
      }

      if (!validateEmail(email)) {
        setErros("Por favor, insira um e-mail válido.");
        return;
      }

      setErros("");
      setIsLoading(true);

      const userData = await login(email, password);

      if (userData) {
        await authContext(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErros("Erro ao fazer login, verifique seu email e senha.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-secondary">
      <Menu />

      <div className="relative w-full bg-gradient-to-br from-main via-main/95 to-red-800 text-whiteColor overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">ÁREA ADMINISTRATIVA</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Portal de <span className="text-yellow-400">Acesso</span>
            </h1>

            <p className="text-md md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Faça login para acessar o painel administrativo e gerenciar o conteúdo do site.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary transform -skew-y-1 origin-bottom-left"></div>
      </div>

      <div className="flex-1 bg-secondary flex items-center justify-center py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Autenticação</h2>
                    <p className="text-gray-400 text-sm">Acesse sua conta administrativa</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                    <Field
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                    <Field
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full"
                    />
                  </div>

                  {erros && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-red-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-red-400 text-sm font-medium">{erros}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 pb-8">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`
                    w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                    ${
                      isLoading
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-lg"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Entrando...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Entrar</span>
                    </>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300"
                  >
                    ← Voltar para a Home
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/30 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-yellow-400 text-sm font-medium">Acesso Restrito</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Esta área é destinada exclusivamente aos administradores do site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
