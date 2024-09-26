import { User } from "../../../hooks/user";
import UserList from "../../molecules/Family/UserList";
import { Box } from "@chakra-ui/react";

type FamilyMemberBoardProps = {
  independentUsers: User[] | undefined;
};

const FamilyMemberBoard: React.FC<FamilyMemberBoardProps> = ({
  independentUsers,
}) => {
  return (
    <>
      <Box
        h={"400px"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        overflowY={"auto"}
        p={4}
      >
        {independentUsers?.map((member, index) => (
          <UserList id={member.id} name={member.name} key={index} />
        ))}
      </Box>
    </>
  );
};

export default FamilyMemberBoard;