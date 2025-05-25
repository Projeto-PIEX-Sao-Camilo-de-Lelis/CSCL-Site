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
  const [imageHtml, setImageHtml] = useState("");
  const [textHtml, setTextHtml] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
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
          className="flex text-whiteflex gap-2 text-white hover:text-main transition"
        >
          <ArrowLeft className="mr-2" />
        </button>
      </div>

      <div className="flex flex-col items-center w-full flex-1">
        <div className="flex flex-col justify-start items-center w-full max-w-[900px] bg-[#272525] p-4 md:p-10 rounded-2xl shadow-lg mt-8 mb-8">
          {loading ? (
            <span className="text-white">Carregando...</span>
          ) : post ? (
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col items-center">
                <h1 className="text-white font-bold text-[2rem] mb-2 text-center">
                  {post.title}
                </h1>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[1rem] justify-start">
                  Autor: {post.author}
                </span>
                <span className="text-gray-400 text-[1rem] justify-start">
                  Data de publicação: {post.publishedAt}
                </span>
              </div>
              <hr className="border-gray-600 my-2" />
              <div className="w-full flex justify-center mb-2">
                <div
                  className="max-w-[700px] max-h-[500px] w-full flex justify-center items-center overflow-hidden rounded-lg"
                  style={{ margin: "0 auto" }}
                  dangerouslySetInnerHTML={{ __html: imageHtml }}
                />
              </div>
              <div
                className="w-full text-white text-[1.2rem] prose prose-invert text-justify"
                dangerouslySetInnerHTML={{ __html: textHtml }}
              />
            </div>
          ) : (
            <span className="text-red-500">Post não encontrado.</span>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
