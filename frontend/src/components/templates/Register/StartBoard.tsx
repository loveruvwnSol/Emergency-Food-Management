import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../../atoms/Base/Logo";
import RegisterBtn from "../../atoms/Register/RegisterBtn";

export const StartBoard = () => {
const navigate = useNavigate();

    return (
        <Box display="flex" alignItems="center" justifyContent="space-evenly" mx="auto" minHeight="100vh">
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Logo size="200px" />
                <Text fontWeight="bold" pt={8}>家にある非常食を管理できる</Text>
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="center" rowGap={8}>
                <Box onClick={()=> {
                    navigate("/login");
                    }}>
                    <RegisterBtn text='ログイン' bgColor='#FB8B24' color='#FFF' activeColor='#FFAB5E' />
                </Box>
                <Box onClick={()=> {
                    navigate("/createAccount");
                    }}>
                    <RegisterBtn text='アカウント作成' bgColor='#F0E9E2' color='#FB8B24' activeColor='#F8E3D0' />
                </Box>
            </Box>
        </Box>
    );
};
