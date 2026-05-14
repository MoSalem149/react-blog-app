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
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            📝 My Blog
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <span className="font-semibold">Hi, {user.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
