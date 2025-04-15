import { useContext, useState } from "react";
import { UserContext, UserContextProvider } from "../context/UserContext";
import login from "../services/authService";
import Footer from "./footer/Footer";
import Field from "./input/Field";
import Menu from "./menu/Menu";


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authContext } = useContext(UserContext);

    async function handleLogin(){
        const token = await login(email, password);
        
        if(token){
            authContext(token);
        }
    }

    return(
        <UserContextProvider>
            <div className="flex flex-col justify-between items-center bg-secondary w-screen h-screen">
                <Menu/>
                <div className = "flex flex-col justify-center items-center w-[300px] h-[300px] border-b rounded-2xl border-red-600 bg-gradient-to-r from-black via-gray-950 via-red-950 to-black md:w-2xl min-h-[35vh]">
                    <div className="flex flex-col justify-center items-center w-[285px] md:w-[400px] bg-transparent">
                        <span className="text-[1rem] text-whiteColor">Login</span>
                        <Field type = "email" placeholder="Digite seu login" onChange={(e) => setEmail(e.target.value)}/>
                        <span className="text-[1rem] text-whiteColor">Senha</span>
                        <Field type = "password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
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
        </UserContextProvider>
    )
}