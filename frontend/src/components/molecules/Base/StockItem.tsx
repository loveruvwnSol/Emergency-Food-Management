import { Box, Image, Text } from '@chakra-ui/react';
import WaterImage from '../../../images/water.jpg';

type StockItemProps = {
  size: number;
};

export const StockItem: React.FC<StockItemProps> = ({ size }) => {
  return (
    <Box>
      <Image
        border={'2px'}
        borderColor={'gray.300'}
        borderRadius={14}
        w={size}
        height={size}
        src={WaterImage}
        alt='water'
      />
      <Text
        fontWeight={'bold'}
        mt={2}
      >
        天然水 2L
      </Text>
      <Text
        fontWeight={'bold'}
        color={'#FB8B24'}
        mt={1}
      >
        2024/01/01
      </Text>
    </Box>
  );
};
