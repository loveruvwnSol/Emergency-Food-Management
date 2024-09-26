import { Box, Text } from '@chakra-ui/react';
import { StockItem } from '../../molecules/Base/StockItem';
import { Link } from 'react-router-dom';

type HomeStockItemListProps = {
  title: string;
};

export const HomeStockItemList: React.FC<HomeStockItemListProps> = ({ title }) => {
  return (
    <Box mb={10}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={8}
      >
        <Text
          fontSize={24}
          fontWeight={'bold'}
        >
          {title}
        </Text>
        <Link to={'/items'}>
          <Text
            color={'#FB8B24'}
            textDecoration={'underline'}
            _hover={{ opacity: 0.5 }}
          >
            もっと見る
          </Text>
        </Link>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={10}
      >
        <StockItem size={150} />
        <StockItem size={150} />
        <StockItem size={150} />
        <StockItem size={150} />
      </Box>
    </Box>
  );
};
