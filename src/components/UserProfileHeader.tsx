import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";

// import { loggedUser, useAuth } from "../context/userContext";

interface userProfileHeaderProps {
  username: string;
  email: string;
  profileUrl: string;
  blogCount: number;
}

const UserProfileHeader = ({
  username,
  email,
  profileUrl,
  blogCount,
}: userProfileHeaderProps): JSX.Element => {
  //   const { getCurrentUser } = useAuth();
  //   const user: loggedUser = getCurrentUser();

  return (
    <Flex width="100%">
      <Flex alignItems="center" gap={5}>
        <Avatar src={profileUrl} size="xl" />
        <Stack spacing={2}>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Name:
            </Text>{" "}
            {username}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Email:
            </Text>{" "}
            {email}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            <Text as="span" fontWeight="normal">
              Blog Count:
            </Text>{" "}
            {blogCount}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default UserProfileHeader;
