import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await login(form);
      showToast("Welcome back");
      const fallback = user.role === "admin" ? "/admin" : "/dashboard";
      navigate(location.state?.from?.pathname || fallback, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card glass-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Login</p>
        <h1>Access your UniTool workspace</h1>
        {error && <div className="alert error">{error}</div>}
        <FormInput label="Email" type="email" value={form.email} onChange={update("email")} required />
        <FormInput label="Password" type="password" value={form.password} onChange={update("password")} required />
        <button className="button button-primary full" type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <p className="auth-switch">New to UniTool? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  );
}
