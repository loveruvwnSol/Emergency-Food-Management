import React from "react";
import { CircularProgress, CircularProgressLabel, Box } from "@chakra-ui/react";

type ProgressCircleProps = {
  current: number;
  goal: number;
  color?: string;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  current,
  goal,
  color,
}) => {
  const percentage =
    goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;

  return (
    <Box textAlign="center">
      <CircularProgress
        value={percentage}
        color={color}
        size="300px"
        trackColor="#FFF"
        thickness="8px"
      >
        <CircularProgressLabel>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box fontSize="64px" fontWeight="bold" color={color} pb={4} pr={2}>
              {percentage}
            </Box>
            <Box fontSize="40px">%</Box>
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export default ProgressCircle;
