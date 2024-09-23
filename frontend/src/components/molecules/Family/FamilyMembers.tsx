import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

type FamilyMembersProps = {
  Name: string;
};

const FamilyMembers: React.FC<FamilyMembersProps> = ({ Name }) => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        m={5}
        mb={2}
        ml={8}
        w={'400px'}
        h={'60px'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={4}
        >
          <Box //アイコン
            w={35}
            h={35}
            borderRadius={50}
            border={'1px solid'}
          ></Box>
          <Text>{Name}</Text>
        </Box>
        <Button
          w={'90px'}
          h={'32px'}
          borderRadius={'25px'}
          mr={5}
          bgColor={'#FB8B24'}
          color={'#ffffff'}
          _hover={{ bgColor: '#FB8B24' }}
          _active={{ bgColor: '#ffcb9a' }}
        >
          招待
        </Button>
      </Box>
    </>
  );
};

export default FamilyMembers;
