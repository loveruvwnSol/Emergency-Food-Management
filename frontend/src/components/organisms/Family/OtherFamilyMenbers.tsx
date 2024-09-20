import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type OtherFamilyMenbersProps = {
  Name: string;
  food: number;
  drink: number;
};

const OtherFamilyMenbers: React.FC<OtherFamilyMenbersProps> = ({ Name, drink, food }) => {
  return (
    <>
      <Box //利用者のプロフィール
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}
        mb={2}
        mt={10}
        w={'800px'}
        h={'60px'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          w={'80%'}
          gap={50}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={8}
          >
            <Box //アイコン
              w={'60px'}
              h={'60px'}
              borderRadius={50}
              border={'1px solid'}
            ></Box>
            <Text
              fontSize={'20px'}
              fontWeight={'bold'}
            >
              {Name}
            </Text>
          </Box>
          <Box
            display={'flex'}
            gap={3}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
            >
              <Text
                color={'#000000'}
                fontSize={'12px'}
                fontWeight={'medium'}
                opacity={'50%'}
              >
                目標備蓄数
              </Text>
              <Icon
                as={IoIosArrowForward}
                color={'#000000'}
                opacity={'50%'}
              />
            </Box>
            <Box>
              <Text
                color={'#000000'}
                fontSize={'12px'}
                fontWeight={'medium'}
                opacity={'50%'}
              >
                食料{food}日分
              </Text>
              <Text
                color={'#000000'}
                fontSize={'12px'}
                fontWeight={'medium'}
                opacity={'50%'}
              >
                飲料{drink}日分
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OtherFamilyMenbers;
