import Footer from "./footer/Footer";
import Menu from "./menu/Menu";

export default function CreatePostPage() {
    return (
        <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
            <Menu />
            <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor">
                <h1 className="text-center w-full text-2xl m-7">Criar Post</h1>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[40vw] bg-[#272525] md:min-w-[60vw] p-8 rounded-2xl shadow-lg mt-8 mb-8">
                <label className="text-white text-[1.5rem] mb-4">Título</label>
                <input
                    className="w-full h-[50px] text-white text-[1.2rem] p-3 rounded-lg mb-6 border border-white bg-transparent"
                    type="text"
                    placeholder="Digite o título do post"
                />

                <label className="text-white text-[1.5rem] mb-4">Conteúdo</label>
                <textarea
                    className="w-full h-[200px] text-white text-[1.2rem] p-3 rounded-lg mb-6 border border-white bg-transparent"
                    placeholder="Digite o conteúdo do post"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button className="px-6 py-3 bg-main text-white text-[1.2rem] rounded-lg hover:bg-red-700 transition duration-300">
                    Postar
                </button>
            </div>

            <Footer />
        </div>
    );
}