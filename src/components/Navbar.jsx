import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../providers/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="text-5xl font-black tracking-tight text-neutral-800"
        >
          Blog
        </Link>

        <div className="flex items-center gap-4 text-lg font-medium text-neutral-700">
          {user ? (
            <>
              <span className="hidden md:block">Hi {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-neutral-400 bg-white px-6 py-3 shadow-sm transition hover:-translate-y-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-2xl border border-neutral-400 bg-white px-6 py-3 shadow-sm transition hover:-translate-y-1"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
