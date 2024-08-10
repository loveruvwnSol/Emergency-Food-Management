import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const Login = async (email: string, password: string) => {
    try {
      if (email && password) {
        const user = {
          email: email,
          password: password,
        };
        const res = await axios.post("http://localhost:8080/login", user);
        if (res.status === 200) {
          sessionStorage.setItem("TOKEN_KEY", res.data);
          navigate("/");
        }
      }
    } catch (error) {
      alert("ログインできませんでした。");
    }
  };

  const CreateAccount = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      if (name && email && password) {
        const user = {
          name: name,
          email: email,
          password: password,
        };
        const res = await axios.post(
          "http://localhost:8080/createAccount",
          user
        );
        if (res.status === 200) {
          alert("アカウントを作成しました。");
          navigate("/login");
        }
      }
    } catch (error) {
      alert("アカウントが作れませんでした。");
    }
  };

  const IsLoggedInUser = async () => {
    const token = sessionStorage.getItem("TOKEN_KEY");
    if (token) {
      try {
        const res = await axios.post(
          "http://localhost:8080/isLoggedInUser",
          JSON.stringify(token)
        );
        if (res.status === 200) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        alert("エラー発生。");
        sessionStorage.removeItem("TOKEN_KEY");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return [{ Login, CreateAccount, IsLoggedInUser }];
};
