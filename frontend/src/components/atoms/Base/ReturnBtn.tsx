import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Box } from "@chakra-ui/react";

type ReturnBtn = {
  to: string;
};

export const ReturnBtn: React.FC<ReturnBtn> = ({ to }) => {
  return (
    <Link to={to}>
      <Box mb={16}>
        <FiArrowLeft size={36} />
      </Box>
    </Link>
  );
};
