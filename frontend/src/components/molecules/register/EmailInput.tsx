import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';

type EmailInputProps = {
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

const EmailInput: React.FC<EmailInputProps> = ({ setEmail }) => {

    return (
        <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <InputGroup size='md'>
                <Input w={"600px"} type="email" placeholder="example@xxx.com" onChange={(e)=> setEmail(e.target.value)}
                mb={10} />
            </InputGroup>
        </FormControl>
    );
}

export default EmailInput;
