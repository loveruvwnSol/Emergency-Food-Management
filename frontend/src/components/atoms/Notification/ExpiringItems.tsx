import { Box, Image, Text } from '@chakra-ui/react';
import WaterImage from '../../../images/water.jpg';

type ExpiringItemsProps = {
size: number;
};

const ExpiringItems: React.FC<ExpiringItemsProps> = ({ size }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt={4}>
            <Box w={size} h="auto" aspectRatio={1}>
                <Image w="100%" h="100%" height={size} mb={4} src={WaterImage} alt='water' objectFit="cover" />
            </Box>
            <Text fontWeight={'bold'}>
                天然水 2L
            </Text>
        </Box>
    );
};


export default ExpiringItems;
