import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  profileUrl: string;
  blogs: any[];
}

const UserCard = ({
  id,
  name,
  email,
  profileUrl,
  blogs,
}: UserCardProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={profileUrl}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "purple.500",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {_.upperFirst(name)}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {email}
        </Text>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            onClick={() => {
              navigate(`/user/${id}`);
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "brand.secondary",
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default UserCard;
