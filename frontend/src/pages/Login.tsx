import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ Login }] = useAuth();

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={() => Login(email, password)}>送信</button>
      <Link to="/createAccount">アカウントを作成</Link>
    </div>
  );
};
