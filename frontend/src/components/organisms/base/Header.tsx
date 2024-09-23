import Bell from '../../atoms/base/Bell';
import { Box } from '@chakra-ui/react';
import Logo from '../../atoms/base/Logo';

const Header = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      mt={2}
      mb={12}
    >
      <Box
        mt={2}
        ml={5}
      >
        <Logo size='58' />
      </Box>
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
