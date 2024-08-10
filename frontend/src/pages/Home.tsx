import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>HOME</h1>
      <button
        onClick={() => {
          sessionStorage.removeItem("TOKEN_KEY");
          navigate("/login");
        }}
      >
        ログアウト
      </button>
    </div>
  );
};
