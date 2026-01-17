import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

/* ---------- Icons ---------- */

const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

/* ---------- Component ---------- */

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      navigate("/dashboard"); // ✅ redirect
    } else {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            team_name: formData.teamName,
          },
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Signup successful! Please verify email.");
      navigate("/dashboard"); // ✅ redirect
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-yellow-400 rounded-xl blur opacity-20" />
        <div className="relative bg-zinc-950 border border-yellow-400/30 rounded-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-zinc-900 border border-yellow-400/40 rounded-lg p-3">
              <FlagIcon />
            </div>

            <h2 className="text-2xl font-semibold text-yellow-400 mt-5">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                name="teamName"
                placeholder="Team Name"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg"
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg"
              required
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full bg-yellow-400 py-3 rounded-lg font-semibold"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-yellow-400"
            >
              {isLogin ? "Don’t have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
