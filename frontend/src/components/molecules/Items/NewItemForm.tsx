import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitNewItemBtn } from "../../atoms/Items/SubmitNewItemBtn";
import { Item } from "../../templates/Items/ItemsBoard";

type NewItemModalForm = {
  mode: string;
  item: Item;
  onClose: () => void;
};

export const NewItemModalForm: React.FC<NewItemModalForm> = ({
  mode,
  item,
  onClose,
}) => {
  const [name, setName] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  return (
    <Box w={"30%"}>
      <FormControl>
        <FormLabel>商品名</FormLabel>
        <Input
          ml={3}
          mb={10}
          type="text"
          variant="flushed"
          placeholder="商品名"
          value={item.name}
          onChange={(e) => setName(e.target.value)}
          focusBorderColor="#FB8B24"
        />
        <FormLabel>消費期限</FormLabel>
        <Input
          ml={3}
          mb={10}
          type="date"
          variant="flushed"
          placeholder="商品名"
          value={item.expiration}
          color={expiration || item.expiration ? "black" : "#77859a"}
          focusBorderColor="#FB8B24"
          onChange={(e) => setExpiration(e.target.value)}
        />
        <FormLabel>何日分</FormLabel>
        <Box display={"flex"} alignItems={"center"} mb={10}>
          <NumberInput
            defaultValue={item.stock}
            ml={3}
            min={1}
            w={"80px"}
            focusBorderColor="#FB8B24"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text
            fontSize={"14px"}
            fontWeight={"semibold"}
            color={"#000000"}
            opacity={"50%"}
            ml={2}
          >
            日分
          </Text>
        </Box>
        <FormLabel>タイプ</FormLabel>
        <RadioGroup defaultValue={item.type} ml={3} mb={10}>
          <Stack direction="row">
            <Radio colorScheme="red" value="food">
              食料
            </Radio>
            <Radio colorScheme="red" value="water">
              飲料
            </Radio>
          </Stack>
        </RadioGroup>
        <Box onClick={onClose}>
          <SubmitNewItemBtn
            text={mode === "edit" ? "編集" : "追加"}
            bg={"#FB8B24"}
          />
        </Box>
        {mode === "edit" ? (
          <Box onClick={onClose}>
            <SubmitNewItemBtn text={"削除"} bg={"#BDBDBD"} />
          </Box>
        ) : (
          <></>
        )}
      </FormControl>
    </Box>
  );
};
