import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
const BASE_URL = "https://auth-practice-review-backend.vercel.app/";

function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    created_at: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("トークンが見つかりませんでした");
        return;
      } else {
        try {
          const response = await fetch(`${BASE_URL}api/users`, {
            method: "GET",
            headers: {
              authorization: token,
            },
          });
          const json = await response.json();
          setUserInfo(json);
        } catch (error) {
          setError("エラーが発生しました: " + error.message);
          console.error(error);
        }
      }
    }
    fetchUserInfo();
  }, []);
  return (
    <form className="background">
      <h2>ユーザー情報</h2>
      {error && <div className="error">{error}</div>}
      <form>
        <p>ID:{userInfo.id}</p>
        <p>email:{userInfo.email}</p>
        <p>password:{userInfo.password}</p>
        <p>created_at:{userInfo.created_at}</p>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/")}>ログイン画面へ</button>
      </div>
    </form>
  );
}

export default Dashboard;
