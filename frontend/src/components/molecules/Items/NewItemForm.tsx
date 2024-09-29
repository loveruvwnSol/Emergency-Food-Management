import {
  Box,
  Button,
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
import { Item } from "../../../hooks/items";

type NewItemModalForm = {
  mode: string;
  item: Item;
  onClose: () => void;
  AddNewItem: (
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => Promise<void>;
  UpdateItem: (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => Promise<void>;
  DeleteItem: (itemID: number) => Promise<void>;
};

export const NewItemModalForm: React.FC<NewItemModalForm> = ({
  mode,
  item,
  onClose,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  const formatHyphenDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState<string>(item.name);
  const [expiration, setExpiration] = useState<string>(
    item.expiration ? formatHyphenDate(item.expiration) : ""
  );
  const [stock, setStock] = useState<number>(item.stock);
  const [type, setType] = useState<string>(item.type);

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
          value={name}
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
          value={expiration}
          color={expiration ? "black" : "#77859a"}
          focusBorderColor="#FB8B24"
          onChange={(e) => setExpiration(e.target.value)}
        />
        <FormLabel>何日分</FormLabel>
        <Box display={"flex"} alignItems={"center"} mb={10}>
          <NumberInput
            defaultValue={stock}
            value={stock}
            onChange={(valueString) => {
              const value = parseInt(valueString, 10);
              if (!isNaN(value)) {
                setStock(value);
              }
            }}
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
        <RadioGroup
          defaultValue={type}
          ml={3}
          mb={10}
          value={type}
          onChange={(e) => setType(e)}
        >
          <Stack direction="row">
            <Radio colorScheme="red" value="food">
              食料
            </Radio>
            <Radio colorScheme="red" value="drink">
              飲料
            </Radio>
          </Stack>
        </RadioGroup>
        <Button
          float={"right"}
          bg={"#FB8B24"}
          color={"white"}
          pl={6}
          pr={6}
          mr={3}
          borderRadius={20}
          cursor={"pointer"}
          _hover={{ opacity: 0.5 }}
          _active={{ bgColor: "#FED6B1" }}
          onClick={
            mode === "edit"
              ? () => {
                  if (name && expiration && stock && type) {
                    onClose();
                    UpdateItem(item.id, name, expiration, stock, type);
                  } else {
                    alert("入力していない項目があります。");
                  }
                }
              : () => {
                  if (name && expiration && stock && type) {
                    onClose();
                    AddNewItem(name, expiration, stock, type);
                  } else {
                    alert("入力していない項目があります。");
                  }
                }
          }
        >
          {mode === "edit" ? "編集" : "追加"}
        </Button>
        {mode === "edit" ? (
          <Button
            float={"right"}
            bg={"#BDBDBD"}
            color={"white"}
            pl={6}
            pr={6}
            mr={3}
            borderRadius={20}
            cursor={"pointer"}
            _hover={{ opacity: 0.5 }}
            _active={{ bgColor: "#FED6B1" }}
            onClick={() => DeleteItem(item.id)}
          >
            削除
          </Button>
        ) : (
          <></>
        )}
      </FormControl>
    </Box>
  );
};
