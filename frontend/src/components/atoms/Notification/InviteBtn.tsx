import { Button } from '@chakra-ui/react';
import { useState } from 'react';

type InviteBtnProps = {
    onClick?: () => void;
};

const InviteBtn: React.FC<InviteBtnProps> = ({ onClick }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(prev => !prev);
        if (onClick) {
            onClick();
        }
    };

    return (
        <Button
            bgColor={isClicked ? "#828282" : "#FB8B24"}
            color="#FFF"
            w={24}
            py={4}
            borderRadius={50}
            onClick={handleClick}
            _hover={{ bgColor: isClicked ? "#828282" : "#FB8B24" }} 
        >
            承認
        </Button>
    );
};

export default InviteBtn;
