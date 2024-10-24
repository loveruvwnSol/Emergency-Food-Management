import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useFamily } from "./family";

interface ErrorResponse {
  error: string;
}

export type Item = {
  id: number;
  family_id: number;
  name: string;
  expiration: string;
  stock: number;
  type: string;
  image_url?: string;
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
        const res = await axios.get(
          `http://localhost:8080/families/${familyID}/items`
        );
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
    type: string,
    file: File,
    onClose: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset");

      const uploadRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as string,
        formData
      );

      const image_url = uploadRes.data.secure_url;

      const newItem = {
        family_id: familyID,
        name: name,
        expiration: expiration,
        stock: stock,
        type: type,
        image_url: image_url,
      };
      const res = await axios.post(
        `http://localhost:8080/families/items`,
        newItem
      );
      if (res.status === 201) {
        alert("アイテムを追加しました。");
        setItems(res.data.items);
        onClose();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;

        if (errorData && typeof errorData.error === "string") {
          alert(errorData.error);
        } else {
          alert("不明なエラーが発生しました。");
        }
      } else {
        alert("不明なエラーが発生しました。");
      }
    }
  };

  const UpdateItem = async (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string,
    file: File | undefined,
    image_url: string | undefined,
    onClose: () => void
  ) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_preset");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as string,
          formData
        );

        image_url = uploadRes.data.secure_url;
      }

      const updatedItem = {
        family_id: familyID,
        name: name,
        expiration: expiration,
        stock: stock,
        type: type,
        image_url: image_url,
      };
      const res = await axios.put(
        `http://localhost:8080/items/${id}`,
        updatedItem
      );
      if (res.status === 200) {
        alert("アイテムを編集しました。");
        setItems(res.data.items);
        onClose();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;

        if (errorData && typeof errorData.error === "string") {
          if (errorData.error === "Not found update item") {
            alert("項目を変更してください。");
          } else {
            alert(errorData.error);
          }
        } else {
          alert("不明なエラーが発生しました。");
        }
      } else {
        alert("不明なエラーが発生しました。");
      }
    }
  };

  const DeleteItem = async (itemID: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/families/${familyID}/items/${itemID}`
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
        const res = await axios.get(
          `http://localhost:8080/families/${familyID}/items/search`,
          {
            params: { q: query, familyID: familyID },
          }
        );
        if (res.status === 200) {
          setItems(res.data.filteredItems);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [
    { items, GetItems, AddNewItem, UpdateItem, DeleteItem, SearchFamilyItems },
  ];
};
