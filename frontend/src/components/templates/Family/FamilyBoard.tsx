import { Box } from '@chakra-ui/react';
import Header from '../../organisms/base/Header';

import SidebarItems from '../../molecules/SidebarItems';
import FamilyContents from './FamilyContents';

const FamilyBoard = () => {
  return (
    <>
      <Header />
      <Box
        display={'flex'}
        alignItems={'start'}
      >
        <SidebarItems />
        <FamilyContents />
      </Box>
    </>
  );
};

export default FamilyBoard;
