import FamilyMembers from '../../molecules/Family/FamilyMembers';
import { Box } from '@chakra-ui/react';

const FamilyMembersBoard = () => {
  const Members = [
    { Name: 'Jason' },
    { Name: 'Yay' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
    { Name: 'benjyfishy' },
  ];

  return (
    <>
      <Box
        h={'400px'}
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        overflowY={'auto'}
        p={4}
      >
        {Members.map((member, index) => (
          <FamilyMembers
            Name={member.Name}
            key={index}
          />
        ))}
      </Box>
    </>
  );
};

export default FamilyMembersBoard;
