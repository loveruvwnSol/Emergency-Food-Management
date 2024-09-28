import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

type FoodGoalSettingProps = {
  handleFoodChange: (value: number) => void;
  foodStock: number;
};

const FoodGoalSetting: React.FC<FoodGoalSettingProps> = ({ handleFoodChange, foodStock }) => {
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
          食料
        </Text>
        <NumberInput
          value={foodStock}
          min={1}
          w={'80px'}
          focusBorderColor='#FB8B24'
          onChange={(valueString) => handleFoodChange(Number(valueString))}
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

export default FoodGoalSetting;
