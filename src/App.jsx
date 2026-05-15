import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostForm from "./pages/PostForm";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/new" element={<PostForm />} />
        <Route path="/post/:id" element={<PostForm />} />
        <Route
          path="*"
          element={
            <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
              <h1 className="mb-4 text-7xl font-black text-neutral-800">404</h1>
              <p className="mb-8 text-2xl text-neutral-600">Oops! Page not found</p>
              <a
                href="/"
                className="rounded-2xl border border-neutral-400 bg-white px-8 py-3 font-semibold shadow-sm transition hover:-translate-y-1"
              >
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
