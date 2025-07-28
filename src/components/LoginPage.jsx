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
  const [erros, setErros] = useState();
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

      const userData = await login(email, password);

      if (userData) {
        await authContext(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErros("Erro ao fazer login, verifique seu email e senha.");
    }
  }

  return (
    <div className="flex flex-col justify-between items-center bg-secondary">
      <div className="w-full border-b border-red-600">
        <Menu />
      </div>
      <div className="flex flex-col justify-center items-center min-w-full min-h-[70vh]">
        <div
          className="flex flex-col w-[80vw] min-h-[50vh] md:w-[25vw] md:min-h-[50vh] 
                        bg-zinc/10 backdrop-blur-md border border-white/20 
                        rounded-xl shadow-2xl justify-center items-center gap-4
                        relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <div className="flex flex-col justify-center items-center min-w-[65vw] md:min-w-[20vw] relative z-10">
            <span className="text-[1.2rem] text-white mb-2 md:text-[1.3rem] font-semibold">
              Login
            </span>
            <Field
              type="email"
              placeholder="Digite seu login"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-[1.2rem] text-white mb-2 md:text-[1.3rem] font-semibold">
              Senha
            </span>
            <Field
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-2 relative z-10">
            <span className="text-[0.8rem] text-red-400 font-medium">{erros}</span>
          </div>
          <div className="w-full max-w-[250px] mt-4 px-6 relative z-10">
            <button
              onClick={handleLogin}
              className={`
                w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg 
                hover:bg-white/20 border border-white/30 hover:border-white/40
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
                text-base font-medium shadow-lg hover:shadow-xl
                hover:scale-[1.02] active:scale-[0.98] cursor-pointer
              `}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Entrar</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
