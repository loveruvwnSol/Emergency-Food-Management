import Logo from '../../atoms/Logo';
import Bell from '../../atoms/Bell';
import { Box } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      mt={2}
    >
      <Logo />
      <Box
        mr={3}
        mt={2}
      >
        <Bell />
      </Box>
    </Box>
  );
};

export default Header;
