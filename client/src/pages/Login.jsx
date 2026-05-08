import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <input className="input" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full rounded-xl bg-brand-600 py-2 text-white">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-slate-500">
          No account? <Link className="text-brand-600" to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
