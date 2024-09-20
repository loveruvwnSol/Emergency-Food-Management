import { Box, Icon, Text } from '@chakra-ui/react';
import { IoFlagOutline } from 'react-icons/io5';
import { IoBagCheckOutline } from 'react-icons/io5';
import { CiFaceSmile } from 'react-icons/ci';

import { CiFaceFrown } from 'react-icons/ci';

import React from 'react';

type DataBoardProps = {
  Type: string;
  Goal: number;
  Now: number;
  GoodFood: number;
  BadFood: number;
  bg: string;
};

//w500 h600

const DataBoard: React.FC<DataBoardProps> = ({ Type, Goal, Now, GoodFood, BadFood, bg }) => {
  return (
    <>
      <Box
        bgColor={bg}
        w={'500px'}
        h={'600px'}
        borderRadius={'30px'}
      >
        <Text
          fontSize={'32px'}
          fontWeight={'bold'}
          color={'#ffffff'}
          textAlign={'center'}
          mt={'12px'}
        >
          {Type}
        </Text>
        <Box
          width={'95%'}
          height={'80px'}
          m={'0 auto'}
          mt={10}
        >
          <Box display={'flex'}>
            <Box //項目
              width={'40%'}
              height={'80px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              gap={2}
            >
              <Text
                color={'#ffffff'}
                fontWeight={'bold'}
                fontSize={'22px'}
              >
                目標
              </Text>
              <Icon
                as={IoFlagOutline}
                color={'#ffffff'}
                boxSize={'22px'}
              />
            </Box>
            <Box //何日分か件数
              width={'60%'}
              height={'80px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Text
                  color={'#ffffff'}
                  fontWeight={'bold'}
                  fontSize={'36px'}
                >
                  {Now}日分
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box //２個目
          width={'95%'}
          height={'80px'}
          m={'0 auto'}
          mt={10}
        >
          <Box display={'flex'}>
            <Box //項目
              width={'40%'}
              height={'80px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              gap={2}
            >
              <Text
                color={'#ffffff'}
                fontWeight={'bold'}
                fontSize={'22px'}
              >
                現在
              </Text>
              <Icon
                as={IoBagCheckOutline}
                color={'#ffffff'}
                boxSize={'22px'}
              />
            </Box>
            <Box //何日分か件数
              width={'60%'}
              height={'80px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Text
                  color={'#ffffff'}
                  fontWeight={'bold'}
                  fontSize={'36px'}
                >
                  {Goal}日分
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box //3個目
          width={'95%'}
          height={'80px'}
          m={'0 auto'}
          mt={10}
        >
          <Box display={'flex'}>
            <Box //項目
              width={'40%'}
              height={'80px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              gap={2}
            >
              <Text
                color={'#ffffff'}
                fontWeight={'bold'}
                fontSize={'20px'}
                whiteSpace={'pre-line'}
                textAlign={'right'}
              >
                {`消費期限が\n余裕のある非常食`}
              </Text>
              <Icon
                as={CiFaceSmile}
                color={'#ffffff'}
                boxSize={'22px'}
              />
            </Box>
            <Box //何日分か件数
              width={'60%'}
              height={'80px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Text
                  color={'#ffffff'}
                  fontWeight={'bold'}
                  fontSize={'36px'}
                >
                  {GoodFood}件
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box //4個目
          width={'95%'}
          height={'80px'}
          m={'0 auto'}
          mt={10}
        >
          <Box display={'flex'}>
            <Box //項目
              width={'40%'}
              height={'80px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
              gap={2}
            >
              <Text
                color={'#ffffff'}
                fontWeight={'bold'}
                fontSize={'20px'}
                whiteSpace={'pre-line'}
                textAlign={'right'}
              >
                {`消費期限が\n余裕のない非常食`}
              </Text>
              <Icon
                as={CiFaceFrown}
                color={'#ffffff'}
                boxSize={'22px'}
              />
            </Box>
            <Box //何日分か件数
              width={'60%'}
              height={'80px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Text
                  color={'#ffffff'}
                  fontWeight={'bold'}
                  fontSize={'36px'}
                  textAlign={'right'}
                >
                  {BadFood}件
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DataBoard;

<Text color={'#ffffff'}>目標</Text>;
