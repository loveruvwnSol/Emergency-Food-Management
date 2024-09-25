import { Box, Text } from '@chakra-ui/react';
import Logo from '../../atoms/base/Logo';
import EmailInput from '../../molecules/register/EmailInput';
import PasswordInput from '../../molecules/register/PasswordInput';
import RegisterBtn from '../../atoms/register/RegisterBtn';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { useState } from "react";

const LoginBoard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ Login }] = useAuth();

    return (
        <Box textAlign="center" w={['100%', '80%', '600px']} mx="auto" mt={16}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Logo size='100px' />
            </Box>
            <Text fontWeight='bold' fontSize={32} p={6}>ログイン</Text>
            <Text color='#828282' pb={10}>アカウント情報を入力してください</Text>
            <EmailInput
                setEmail = {setEmail}
            />
            <PasswordInput
                setPassword = {setPassword}
            />
            <Box onClick={() => Login(email, password)}>
                <RegisterBtn
                    text='ログイン'
                    bgcolor='#FB8B24'
                    color='#FFF'
                    activecolor='#FFAB5E'
                />
            </Box>
            <Box display="flex" justifyContent="center" mt={8}>
                <Text color='#828282'>アカウントをお持ちでない方は</Text>
                <Link 
                    to="/createAccount"
                    style={{ color: '#FB8B24', fontWeight: 'bold', textDecoration: 'underline' }}
                >
                    こちら
                </Link>
            </Box>
        </Box>
    )
}

export default LoginBoard;