import { Button } from '@chakra-ui/react';

type RegisterBtnProps = {
    text : string;
    color : string;
    bgColor : string;
    activeColor : string;
}

const RegisterBtn:React.FC<RegisterBtnProps> = ({ text,bgColor,color,activeColor }) => (
    <Button
        bgColor={bgColor} 
        color={color}
        w={60}
        py={6}
        borderRadius={50}
        _hover={{ bgColor: bgColor }}
        _active={{bgColor: activeColor}}
        >
        {text}
    </Button>
);

export default RegisterBtn;