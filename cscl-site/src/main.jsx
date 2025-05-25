import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import "./index.css";
import App from "./App.jsx";
import BlogPage from "./components/BlogPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import DashBoardPage from "./components/DashBoardPage.jsx";
import CreatePostPage from "./components/CreatePostPage.jsx";
import ViewPostPage from "./components/ViewPostPage.jsx";
import EditPostPage from "./components/EditPostPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/blog/:slug" element={<ViewPostPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);