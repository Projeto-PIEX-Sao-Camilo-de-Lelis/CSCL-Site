import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../services/postService";


export default function ViewPostPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPost(slug);
                setPost(data);
            } catch (error) {
                setPost(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    return (
        <div className="flex flex-col w-full min-w-[65vw] min-h-[40vh] overflow-x-hidden justify-center items-center bg-secondary ">
            <Menu />
            <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor relative">
                <h1 className="text-center w-full text-2xl m-7">Post</h1>
            </div>

            <div className="self-start ml-4 mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex gap-2 text-white hover:text-main transition"
                >
                    <ArrowLeft className="mr-2" />
                </button>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[40vw] bg-[#272525] md:min-w-[60vw] p-8 rounded-2xl shadow-lg mt-8 mb-8">
                {loading ? (
                    <span className="text-white">Carregando...</span>
                ) : post ? (
                    <>
                        <h1 className="w-full text-white font-bold text-[1.5rem] mb-6">{post.title}</h1>
                        <div
                            className="w-full text-white text-[1.2rem] mb-6 prose prose-invert"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </>
                ) : (
                    <span className="text-red-500">Post não encontrado.</span>
                )}
            </div>

            <Footer />
        </div>
    );
}