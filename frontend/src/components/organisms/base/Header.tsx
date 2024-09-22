import Bell from '../../atoms/Bell';
import { Box, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      mt={2}
      mb={12}
    >
      <Text>logo入れるここ</Text>
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
