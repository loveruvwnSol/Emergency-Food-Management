import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

type DrinkGoalSettingProps = {
  handleDrinkChange: (value: number) => void;
  drinkStock: number;
};

const DrinkGoalSetting: React.FC<DrinkGoalSettingProps> = ({ handleDrinkChange, drinkStock }) => {
  return (
    <Box>
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
          飲料
        </Text>
        <NumberInput
          value={drinkStock}
          min={1}
          w={'80px'}
          focusBorderColor='#FB8B24'
          onChange={(valueString) => handleDrinkChange(Number(valueString))}
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
          ml={2}
        >
          日分
        </Text>
      </Box>
    </Box>
  );
};

export default DrinkGoalSetting;
