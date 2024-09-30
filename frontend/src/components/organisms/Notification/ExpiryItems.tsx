import { Box } from '@chakra-ui/react';
import ExpiryLists from '../../molecules/Notification/ExpiryLists';

const ExpiryItems = () => {
    return (
        <Box alignSelf="flex-start">
            <ExpiryLists date="2024/01/01" itemCount={6} />
            <ExpiryLists date="2025/01/01" itemCount={4} />
            <ExpiryLists date="2026/01/01" itemCount={2} />
        </Box>
    )
}

export default ExpiryItems;
