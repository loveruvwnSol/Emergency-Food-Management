import axios from "axios";
import { useEffect, useState } from "react";
import { useFamily } from "./family";

export type Item = {
  id: number;
  family_id: number;
  name: string;
  expiration: string;
  stock: number;
  type: string;
  image: string;
};

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [{ familyID }] = useFamily();

  useEffect(() => {
    GetItems();
  }, [familyID]);

  const GetItems = async () => {
    if (familyID) {
      try {
        const res = await axios.get(`http://localhost:8080/items/${familyID}`);
        if (res.status === 200) {
          setItems(res.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const AddNewItem = async (
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => {
    try {
      const newItem = {
        family_id: familyID,
        name: name,
        expiration: expiration,
        stock: stock,
        type: type,
      };
      console.log(newItem);
      const res = await axios.post(`http://localhost:8080/item`, newItem);
      if (res.status === 201) {
        alert("アイテムを追加しました。");
        setItems(res.data.items);
      }
    } catch (error) {
      alert("アイテムの追加に失敗しました。");
      console.log(error);
    }
  };

  const UpdateItem = async (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => {
    try {
      const updatedItem = {
        family_id: familyID,
        name: name,
        expiration: expiration,
        stock: stock,
        type: type,
      };
      console.log(updatedItem);
      const res = await axios.put(
        `http://localhost:8080/item/${id}`,
        updatedItem
      );
      if (res.status === 200) {
        alert("アイテムを編集しました。");
        setItems(res.data.items);
      }
    } catch (error) {
      alert("アイテムの編集に失敗しました。");
      console.log(error);
    }
  };

  const DeleteItem = async (itemID: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/item/${familyID}/${itemID}`
      );
      if (res.status === 200) {
        alert("アイテムを削除しました。");
        setItems(res.data.items);
      }
    } catch (error) {
      alert("アイテムの削除に失敗しました。");
      console.log(error);
    }
  };

  const SearchFamilyItems = async (query: string) => {
    if (query.trim()) {
      try {
        const res = await axios.get(`http://localhost:8080/items/search`, {
          params: { q: query, familyID: familyID },
        });
        if (res.status === 200) {
          setItems(res.data.filteredItems);
          console.log(res.data);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [
    { items, GetItems, AddNewItem, UpdateItem, DeleteItem, SearchFamilyItems },
  ];
};
