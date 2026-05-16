import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateRegister } from "../utils/validators";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateRegister(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(form);
      showToast("Account created. Please login.");
      navigate("/login");
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card glass-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Register</p>
        <h1>Create a student account</h1>
        {error && <div className="alert error">{error}</div>}
        <FormInput label="Full name" value={form.name} onChange={update("name")} required />
        <FormInput label="Email" type="email" value={form.email} onChange={update("email")} required />
        <FormInput label="Password" type="password" value={form.password} onChange={update("password")} required />
        <button className="button button-primary full" type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        <p className="auth-switch">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
