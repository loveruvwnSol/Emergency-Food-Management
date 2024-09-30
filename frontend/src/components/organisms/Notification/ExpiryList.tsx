import { Box, Text } from "@chakra-ui/react";
import ExpiryItems from "../../molecules/Notification/ExpiryItems";
import { useNotification } from "../../../hooks/notification";
import { useEffect } from "react";

const ExpiryList = () => {
  const [{ notifications, UpdateReadStatus }] = useNotification();

  useEffect(() => {
    UpdateReadStatus();
  }, [notifications]);

  return (
    <Box alignSelf="flex-start">
      {notifications.length ? (
        <>
          {notifications.map((e, idx) => (
            <ExpiryItems key={idx} data={e.notification} items={e.items} />
          ))}
        </>
      ) : (
        <Text
          height={96}
          w={"1000px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={24}
          fontWeight={"bold"}
        >
          通知はありません
        </Text>
      )}
    </Box>
  );
};

export default ExpiryList;
