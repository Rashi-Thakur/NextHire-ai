import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
        <h2 className="text-2xl font-bold">Create account</h2>
        <input className="input" placeholder="Full Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Password" type="password" required minLength={6} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full rounded-xl bg-brand-600 py-2 text-white">
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-sm text-slate-500">
          Already registered? <Link className="text-brand-600" to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
