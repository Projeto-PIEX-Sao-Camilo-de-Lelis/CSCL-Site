import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ViewPostPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
            <Menu />
            <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor relative">
                <h1 className="text-center w-full text-2xl m-7">Post</h1>
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
                />


                <label className="text-white text-[1.5rem] mb-4">Conteúdo</label>
                <textarea
                    className="w-full h-[200px] text-white text-[1.2rem] p-3 rounded-lg mb-6 border border-white bg-transparent"
                ></textarea>
            </div>

            <Footer />
        </div>
    );
}