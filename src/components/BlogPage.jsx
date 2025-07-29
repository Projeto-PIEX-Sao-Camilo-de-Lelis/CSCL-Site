import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import PostList from "./posts/PostList";

export default function BlogPage() {
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
              <span className="text-sm font-medium">ACOMPANHE NOSSAS NOVIDADES</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Blog da <span className="text-yellow-400">Casa São Camilo</span>
            </h1>

            <p className="text-md md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Fique por dentro das últimas notícias, eventos e histórias inspiradoras da nossa
              instituição. Conheça mais sobre nosso trabalho e como você pode fazer a diferença.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-secondary transform -skew-y-1 origin-bottom-left"></div>
      </div>

      <div className="flex-1 bg-secondary">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <PostList />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
