import MainPage from "./components/MainPage";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <div className="overflow-x-hidden">
                    <MainPage />
                </div>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default App;

