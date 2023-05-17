import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";

import { loggedUser, useAuth } from "../context/userContext";

const UserProfileHeader = (): JSX.Element => {
  const { getCurrentUser } = useAuth();
  const user: loggedUser = getCurrentUser();

  return (
    <Flex width="100%">
      <Flex alignItems="center" gap={5}>
        <Avatar src={user.profileUrl} size="xl" />
        <Stack spacing={2}>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Name:
            </Text>{" "}
            {user.name}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Email:
            </Text>{" "}
            {user.email}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Blog Count:
            </Text>{" "}
            {user.blogCount}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default UserProfileHeader;
