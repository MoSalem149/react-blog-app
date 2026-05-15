import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";
import { UserContext } from "../providers/UserContext";
import { toast } from "react-toastify";

export default function Register() {
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
      const res = await api.post("/register", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      login(res.data.user, res.data.accessToken);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-6 py-10">
      <div className="rounded-3xl border border-neutral-300 bg-white p-10 shadow-sm">
        <h2 className="mb-12 text-center text-6xl font-black text-neutral-800">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-neutral-300 px-6 py-5 text-xl outline-none transition focus:border-neutral-700"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-neutral-800 py-5 text-2xl font-bold text-white transition hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-lg text-neutral-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-neutral-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
