import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ CreateAccount }] = useAuth();
  
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      ></input>
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
      <button onClick={() => CreateAccount(name, email, password)}>送信</button>
      <Link to="/login">ログインする</Link>
    </div>
  );
};
