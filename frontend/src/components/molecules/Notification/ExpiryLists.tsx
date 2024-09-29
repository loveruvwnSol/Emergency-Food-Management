import { Box, Text } from '@chakra-ui/react';
import ExpiringItems from '../../atoms/Notification/ExpiringItems';

type ExpiringListProps = {
    date : string ;
    itemCount : number ;
}

const ExpiryLists : React.FC<ExpiringListProps> = ({date,itemCount}) => {
    return (
        <Box borderWidth='2px' borderColor="#828282" borderRadius={20} mt={8} p={4} gap={4} flexDirection="column">
            <Text color="#333" textAlign="start" mb={4} fontSize="20px">
                <Box as="span" color="#FB8B24" fontWeight="bold">{date}</Box>
                に消費期限が切れます
            </Text>
            <Box display="flex" gap={4} flexWrap="wrap">
                {Array.from({ length: itemCount }).map((_, index) => (
                <ExpiringItems key={index} size={140} />
                ))}
            </Box>
        </Box>
    )
}

    export default ExpiryLists;
