import { Button } from '@chakra-ui/react';

type RegisterBtnProps = {
    text : string;
    color : string;
    bgcolor : string;
    activecolor : string;
}

const RegisterBtn:React.FC<RegisterBtnProps> = ({ text,bgcolor,color,activecolor }) => (
    <Button
        bgColor={bgcolor} 
        color={color}
        w={60}
        py={6}
        borderRadius={50}
        _hover={{ bgColor: bgcolor }}
        _active={{bgColor: activecolor}}
        >
        {text}
    </Button>
);

export default RegisterBtn;