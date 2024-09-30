import { Box } from "@chakra-ui/react";
import StockCircles from "../../molecules/Notification/StockCircles";

const LowStock: React.FC = () => {
  return (
    <Box justifyItems="center">
      <StockCircles />
    </Box>
  );
};
export default LowStock;
