import { Box } from '@chakra-ui/react';
import StockCircle from '../../molecules/Notification/StockCircle';

const LowStock: React.FC = () => {
  return (
    <Box justifyItems="center">
        <StockCircle />
    </Box>
  );
}
export default LowStock;
