import { Box, Text } from '@chakra-ui/react';
import Logo from '../../atoms/base/Logo';
import EmailInput from '../../molecules/register/EmailInput';
import PasswordInput from '../../molecules/register/PasswordInput';
import RegisterBtn from '../../atoms/register/RegisterBtn';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { useState } from "react";
import NameInput from '../../molecules/register/NameInput';

const CreateAccountBoard = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ CreateAccount }] = useAuth();

    return (
        <Box textAlign="center" w={['100%', '80%', '600px']} mx="auto" mt={10}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Logo size='100px' />
            </Box>
            <Text fontWeight='bold' fontSize={32} p={6}>アカウント作成</Text>
            <Text color='#828282' pb={10}>新しくアカウントを登録しましょう！</Text>
            <NameInput
                setName = {setName}
            />
            <EmailInput
                setEmail = {setEmail}
            />
            <PasswordInput
                setPassword = {setPassword}
            />
            <Box onClick={() => CreateAccount(name, email, password)}>
                <RegisterBtn
                    text='作成'
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

export default CreateAccountBoard;