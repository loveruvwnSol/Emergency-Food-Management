import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  error: string;
}

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
      } else {
        alert("入力していない項目があります。");
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
        const res = await axios.post("http://localhost:8080/account", user);
        if (res.status === 201) {
          alert("アカウントを作成しました。");
          navigate("/login");
        }
      } else {
        alert("入力していない項目があります。");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;

        if (errorData && typeof errorData.error === "string") {
          alert(errorData.error);
        } else {
          alert("不明なエラーが発生しました。");
        }
      } else {
        alert("不明なエラーが発生しました。");
      }
    }
  };

  const IsLoggedInUser = async () => {
    const token = sessionStorage.getItem("TOKEN_KEY");
    if (token) {
      try {
        const res = await axios.get("http://localhost:8080/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status !== 200) {
          navigate("/start");
        }
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem("TOKEN_KEY");
        navigate("/start");
      }
    } else {
      navigate("/start");
    }
  };

  return [{ Login, CreateAccount, IsLoggedInUser }];
};
