import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import ProgressCircle from '../../atoms/Notification/ProgressCircle';

const StockCircle: React.FC = () => {
    const [current1, setCurrent1] = useState(4);
    const [goal1, setGoal1] = useState(10);

    const [current2, setCurrent2] = useState(7);
    const [goal2, setGoal2] = useState(10);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-evenly" mx="auto" pt={24}>
                <Box textAlign="center" marginX={16}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>食料備蓄達成度</Text>
                    <ProgressCircle current={current1} goal={goal1} color="#FB8B24" />
                </Box>
                <Box textAlign="center" marginX={16}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>飲料備蓄達成度</Text>
                    <ProgressCircle current={current2} goal={goal2} color="#00C2FF" />
                </Box>
            </Box>
    );
}

export default StockCircle;
