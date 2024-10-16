import { Icon } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

type BellProps = {
  size: string;
}


const Bell:React.FC<BellProps> = ({size}) => {
  return (
    <Icon
      as={FiBell}
      boxSize={size}
      mr={4}
      mb={0.5}
      cursor={'pointer'}
      _hover={{ opacity: '50%' }}
    />
  );
};

export default Bell;
