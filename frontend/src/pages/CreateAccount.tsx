import { useAuth } from "../hooks/auth";
import CreateAccountBoard from "../components/templates/register/CreateAccountBoard";

export const CreateAccount = () => {
  const [{ CreateAccount }] = useAuth();
  
  return (
    <CreateAccountBoard />
  );
};
