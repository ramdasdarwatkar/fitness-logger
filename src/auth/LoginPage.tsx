import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth.service";
import { useAuthStore } from "./auth.store";
import { bootstrapApp } from "../app/bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Authenticate
      const session = await login(email, password);
      if (!session) throw new Error("Invalid login response");

      // 2️⃣ Save auth FIRST (order matters)
      setAuth(session.access_token, session.user.id);

      // 3️⃣ Enter app immediately (prevents redirect race)
      navigate("/", { replace: true });

      // 4️⃣ Bootstrap app data in background
      bootstrapApp().catch(console.error);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl p-6">
        <h1 className="text-xl font-semibold text-center mb-6">
          Fitness Logger
        </h1>

        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-bg border border-gray-700 focus:border-primary outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-bg border border-gray-700 focus:border-primary outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-primary text-black font-semibold disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
