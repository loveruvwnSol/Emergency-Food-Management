import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type SearchMemberProps = {
  GetIndependentUsers: () => void;
  SearchIndependentUsers: (query: string) => void;
};

const SearchMember: React.FC<SearchMemberProps> = ({
  GetIndependentUsers,
  SearchIndependentUsers,
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (query === "") {
      GetIndependentUsers();
    } else {
      SearchIndependentUsers(query);
    }
  }, [query]);

  return (
    <Box mb={"30px"} position={"relative"}>
      <Box w={"400px"} m={"0 auto"}>
        <Text fontSize={"16px"}>家族を検索</Text>
        <Input
          placeholder="鈴木太郎"
          w={"400px"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchMember;
