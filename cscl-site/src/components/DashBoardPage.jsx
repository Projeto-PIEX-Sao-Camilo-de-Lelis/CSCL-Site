import Footer from "./footer/Footer";
import Menu from "./menu/Menu";
import DashboardPostList from "./posts/DashboardPostList";

export default function DashBoardPage() {
    return (
        <div className="flex flex-col w-full overflow-x-hidden justify-center items-center bg-secondary">
            <Menu />
            <div className="flex flex-col w-full justify-center items-center font-bold p-[1rem] bg-gradient-to-r from-black via-red-900 to-red-400 text-whiteColor">
                <h1 className="text-center w-full text-2xl m-7">Postagens</h1>
            </div>

            <div className="m-7 flex flex-col sm:w-full md:w-6xl lg:w-5xl min-h-[15vh] justify-start items-center p-[1rem] text-whiteColor">
                <DashboardPostList />
            </div>

            <Footer />
        </div>
    );
}