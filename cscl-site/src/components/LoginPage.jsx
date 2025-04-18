import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import login from "../services/authService";
import Footer from "./footer/Footer";
import Field from "./input/Field";
import Menu from "./menu/Menu";
import { validateEmail } from "../utils/emailValidator";


export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erros, setErros] = useState();
    const { authContext } = useContext(UserContext);

    async function handleLogin(){
        try{
            if(!email || !password){
                setErros("E-mail e senha são de preenchimento obrigatório.");
                return;
            }

            if(!validateEmail(email)) {
                setErros("Por favor, insira um e-mail válido.");
                return;
            }
            
            setErros("");

            const userData = await login(email, password);    
               
            if(userData){                           
                await authContext(userData);    
                navigate('/dashboard');      
            }
        }catch(err){
            console.error('Login error:', err);
            setErros("Erro ao fazer login, verifique seu email e senha.");
        }
    }

    return(
            <div className="flex flex-col justify-between items-center bg-secondary w-screen h-screen">
                <div className="w-screen border-b border-red-600">
                <Menu/>
                </div>

                <div className = "flex flex-col justify-center items-center min-w-[65vw] min-h-[40vh] border-b rounded-2xl border-red-600 bg-gradient-to-r from-black via-gray-950 via-red-950 to-black md:min-w-[30vw]">
                    <div className="flex flex-col justify-center items-center min-w-[60vw] bg-orange md:min-w-[28vw]">
                        <span className="text-[1.2rem] text-whiteColor mb-2 md:text-[1.5rem]">Login</span>
                        <Field type = "email" placeholder="Digite seu login" onChange={(e) => setEmail(e.target.value)}/>
                        <span className="text-[1.2rem] text-whiteColor mb-2 md:text-[1.5rem]">Senha</span>
                        <Field type = "password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="p-2">
                            <span className="text-[0.8rem] text-red-600">{erros}</span>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleLogin}
                            className={`px-4 py-2 rounded-2xl bg-main text-white "hover:bg-red-700" w-[125px] text-[1.1rem]`}
                        >
                             Entrar
                        </button>
                    </div>

                </div>
            <Footer/>
            </div>
    )
}