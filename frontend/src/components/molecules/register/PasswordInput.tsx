import React from 'react';
import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { BsEye, BsEyeSlash } from "react-icons/bs";

type PasswordInputProps = {
    setPassword: React.Dispatch<React.SetStateAction<string>>
}
const PasswordInput: React.FC<PasswordInputProps> = ({setPassword}) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl>
            <FormLabel>パスワード</FormLabel>
            <InputGroup size='md'>
                <Input w={"600px"} type={show ? 'text' : 'password' } placeholder='Password' mb={10} onChange={(e)=>
                setPassword(e.target.value)}
                />
                <InputRightElement>
                    <IconButton icon={show ? <BsEye /> :
                    <BsEyeSlash />}
                        onClick={handleClick}
                        aria-label={show ? 'Hide password' : 'Show password'}
                        variant="none"
                    />
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
}

export default PasswordInput;
