import { Icon } from '@chakra-ui/react';
import React from 'react';
import { FiBell } from 'react-icons/fi';

const Bell = () => {
  return (
    <Icon
      as={FiBell}
      boxSize={'24px'}
      mr={4}
      mb={0.5}
      cursor={'pointer'}
    />
  );
};

export default Bell;
