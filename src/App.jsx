import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostForm from "./pages/PostForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/new" element={<PostForm />} />
        <Route path="/post/:id" element={<PostForm />} />
        <Route
          path="*"
          element={
            <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
