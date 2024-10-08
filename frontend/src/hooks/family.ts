import axios from "axios";
import { useEffect, useState } from "react";
import { User, useUser } from "./user";

type Family = {
  id: number;
  CreateAt: string;
};

export type FamilyMember = {
  id: number;
  user_id: number;
  family_id: number;
  role: string;
  Family: Family;
  User: User;
  CreateAt: string;
};

export const useFamily = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [familyID, setFamilyID] = useState<number>();
  const [{ user }] = useUser();
  const token = sessionStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    GetFamilyMembers();
  }, [user]);

  const GetFamilyMembers = async () => {
    if (user && user.id) {
      try {
        const res = await axios.get(
          `http://localhost:8080/users/${user.id}/family`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setFamilyMembers(res.data.members);
          setFamilyID(res.data.members[0].family_id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const CreateNewFamily = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/families`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setFamilyMembers(res.data.members);
        alert("新しい家族を作成しました。");
      }
    } catch (error) {
      alert("家族の作成に失敗しました。");
    }
  };

  const InviteUserForFamily = async (userID: number) => {
    try {
      if (userID) {
        const invitation = {
          invitee_id: userID,
          family_id: familyMembers[0].family_id,
        };

        const res = await axios.post(
          "http://localhost:8080/invitations",
          invitation,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          alert("ユーザーを招待しました。");
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Already invite the user"
      ) {
        alert("既にこのユーザーを招待しています。");
      } else {
        alert("招待に失敗しました。");
      }
    }
  };

  const JoinToFamily = async (
    familyID: number,
    setInvitations: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    try {
      const newMember = {
        family_id: familyID,
      };
      const res = await axios.post(
        "http://localhost:8080/invitations/accept",
        newMember,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        alert("家族に参加しました。");
        setInvitations(res.data.invitations);
      }
    } catch (error) {
      alert("家族に参加できませんでした。");
    }
  };

  return [
    {
      familyMembers,
      familyID,
      CreateNewFamily,
      InviteUserForFamily,
      JoinToFamily,
    },
  ];
};
