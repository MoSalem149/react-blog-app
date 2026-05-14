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
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
              <h1 className="text-6xl font-bold mb-4">404</h1>
              <p className="text-2xl mb-8">Oops! Page not found</p>
              <a href="/" className="btn btn-primary">
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
