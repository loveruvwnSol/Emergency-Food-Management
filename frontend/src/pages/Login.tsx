import { useAuth } from "../hooks/auth";
import LoginBoard from "../components/templates/register/LoginBoard";

export const Login = () => {
  const [{ Login }] = useAuth();

  return (
    <LoginBoard />
  );
};
