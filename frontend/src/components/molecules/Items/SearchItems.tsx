import { Box, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type SearchItemsProps = {
  GetItems: () => Promise<void>;
  SearchFamilyItems: (query: string) => Promise<void>;
};

const SearchItems: React.FC<SearchItemsProps> = ({
  GetItems,
  SearchFamilyItems,
}) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (query === "") {
      GetItems();
    } else {
      SearchFamilyItems(query);
    }
  }, [query]);

  return (
    <Box w={"460px"} mb={"30px"} position={"relative"} ml={"240px"}>
      <Box w={"400px"} m={"0 auto"}>
        <Input
          placeholder="検索"
          w={"400px"}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default SearchItems;
