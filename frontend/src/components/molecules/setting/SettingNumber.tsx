import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Text,
  NumberInput,
} from '@chakra-ui/react';

const type = ['食料', '飲料'];

const SettingNumber = () => {
  return (
    <>
      {type.map((type, index) => (
        <Box key={index}>
          <Box
            display={'flex'}
            alignItems={'center'}
            mt={10}
          >
            <Text
              fontSize={'20px'}
              fontWeight={'semibold'}
              mr={10}
            >
              {type}
            </Text>
            <NumberInput
              defaultValue={3}
              min={1}
              w={'80px'}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text
              fontSize={'14px'}
              fontWeight={'semibold'}
              color={'#000000'}
              opacity={'50%'}
            >
              日分
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default SettingNumber;
