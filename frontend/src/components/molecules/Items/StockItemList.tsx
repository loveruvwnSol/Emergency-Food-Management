import { Box, Grid } from '@chakra-ui/react';
import { StockItem } from '../Base/StockItem';

const StockItemList = () => {
  return (
    <Box
      mb={10}
      maxH={'500px'}
      overflowY={'auto'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={8}
      ></Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={10}
      >
        <Grid
          templateColumns='repeat(5, 1fr)'
          gap={6}
        >
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
          <StockItem size={165} />
        </Grid>
      </Box>
    </Box>
  );
};

export default StockItemList;
