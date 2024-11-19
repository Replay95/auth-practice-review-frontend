import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const BASE_URL = "https://auth-practice-review-backend.vercel.app/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const date = await response.json();

      if (!response.ok) {
        throw new Error("ログインに失敗しました");
      }

      localStorage.setItem("token", date.token);
      navigate("/dashboard");
    } catch (error) {
      setError("エラーが発生しました: " + error.message);
    }
  }
  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <IoMail className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/signup")}>サインアップ画面へ</button>
      </div>
    </div>
  );
}

export default Login;
