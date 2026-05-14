import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import { UserContext } from "../providers/UserContext";
import { toast } from "react-toastify";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login
        const res = await api.post("/login", {
          email: formData.email,
          password: formData.password,
        });

        login(res.data.user, res.data.accessToken);
        toast.success("Login successful!");
        navigate("/");
      } else {
        // Register
        const res = await api.post("/register", {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });

        login(res.data.user, res.data.accessToken);
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl mb-4">
              {isLogin ? "Login" : "Register"}
            </h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="input input-bordered"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {isLogin ? "Login" : "Register"}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="btn btn-ghost btn-sm"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
