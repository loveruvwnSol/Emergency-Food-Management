import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';

type NameInputProps = {
    setName: React.Dispatch<React.SetStateAction<string>>
}

const NameInput: React.FC<NameInputProps> = ({ setName }) => {

    return (
        <FormControl>
            <FormLabel>名前</FormLabel>
            <InputGroup size='md'>
                <Input w={"600px"} type="text" placeholder="岩崎太郎" onChange={(e)=> setName(e.target.value)}
                mb={10} />
            </InputGroup>
        </FormControl>
    );
}

export default NameInput;
