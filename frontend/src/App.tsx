import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";
import { useAuth } from "./hooks/auth";
import { useEffect } from "react";
import { Start } from "./pages/Start";

function App() {
  const [{ IsLoggedInUser }] = useAuth();

  useEffect(() => {
    IsLoggedInUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/start" element={<Start />} />
    </Routes>
  );
}

export default App;
