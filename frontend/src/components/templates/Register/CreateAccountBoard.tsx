import { Box, Text } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import EmailInput from "../../molecules/Register/EmailInput";
import PasswordInput from "../../molecules/Register/PasswordInput";
import RegisterBtn from "../../atoms/Register/RegisterBtn";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { useState } from "react";
import NameInput from "../../molecules/Register/NameInput";
import { ReturnBtn } from "../../atoms/Base/ReturnBtn";

const CreateAccountBoard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ CreateAccount }] = useAuth();

  return (
    <Box textAlign="center" w={["80%", "600px"]} mx="auto" mt={16}>
      <Box
        display={{ base: "none", sm: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Logo size="100px" />
      </Box>
      <ReturnBtn to="/start" />
      <Text
        textAlign={{ base: "left", sm: "center" }}
        fontWeight="bold"
        fontSize={32}
        pt={6}
        pb={6}
      >
        アカウント作成
      </Text>
      <Text textAlign={{ base: "left", sm: "center" }} color="#828282" pb={10}>
        新しくアカウントを登録しましょう！
      </Text>
      <NameInput setName={setName} />
      <EmailInput setEmail={setEmail} />
      <PasswordInput setPassword={setPassword} />
      <Box onClick={() => CreateAccount(name, email, password)}>
        <RegisterBtn
          text="作成"
          bgColor="#FB8B24"
          color="#FFF"
          activeColor="#FFAB5E"
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={8}>
        <Text color="#828282">アカウントをお持ちの方は</Text>
        <Link
          to="/login"
          style={{
            color: "#FB8B24",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          こちら
        </Link>
      </Box>
    </Box>
  );
};

export default CreateAccountBoard;
