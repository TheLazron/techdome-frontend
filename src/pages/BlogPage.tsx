import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { loggedUser, useAuth } from "../context/userContext";
import { Blog } from "../types/blogTypes";
import {
  Badge,
  Box,
  Button,
  Stack,
  Flex,
  Heading,
  Icon,
  Spinner,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import BlogHeader from "../components/BlogHeader";
import { ChevronRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DividerComponent from "../components/ui/Divider";
import RecommendationPanel from "../components/RecommendationPanel";
import DeleteBlogModal from "../components/DeleteBlogModal";

const BlogPage = (): JSX.Element => {
  const { blogId } = useParams();
  const { jwtToken, getCurrentUser } = useAuth();
  const [blog, setBlog] = useState<Blog>();

  const currentUser: loggedUser = getCurrentUser();

  useEffect(() => {
    const fetchBlogData = async () => {
      const data = await makeAuthenticatedRequest(
        `http://localhost:3300/get-blog/${blogId}`,
        {},
        "GET",
        jwtToken
      );
      console.log(data);
      setBlog(data.data);
    };

    fetchBlogData();
  }, []);

  if (!blog) {
    return <Spinner />;
  }

  return (
    <VStack width="100%" spacing={5} align="stretch" px={[5, 16]} mt={5}>
      <Box height={["10rem", "20rem"]} color="whiteAlpha.800">
        <BlogHeader title={blog.title} />
      </Box>
      {currentUser && currentUser.id === blog.userId ? (
        <Stack direction="row" alignSelf="flex-end" gap={2}>
          <DeleteBlogModal blogId={blog.id} />
          <IconButton
            p={2}
            rounded={"full"}
            colorScheme="gray"
            size="md"
            icon={<EditIcon />}
            aria-label={""}
          />
        </Stack>
      ) : null}

      <DividerComponent />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          alignSelf="center"
        >
          <Heading
            fontWeight="thin"
            fontSize={["3xl", "4xl"]}
            letterSpacing={2}
          >
            {"Chapter 1 ".toUpperCase()}
          </Heading>
          <Flex gap={2}>
            {blog.tags.map((tag: string) => (
              <Badge key={tag} colorScheme="gray" alignItems="center">
                {tag}
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Flex>
          <Text p={0} m={0}>
            {blog.content}
          </Text>
        </Flex>
      </Box>
      <DividerComponent />
      <Flex alignItems="center" alignSelf="flex-end" gap={2}>
        <Button rounded="full" variant="outline" p={2} borderWidth="2px">
          <Icon as={ChevronRightIcon} />
        </Button>
        <Text letterSpacing={2} fontWeight="thin" fontSize={["xl", "2xl"]}>
          {"Chapter 2 ".toUpperCase()}
        </Text>
      </Flex>
      <DividerComponent />
      <Box mx={10} overflowX="auto">
        <RecommendationPanel />
      </Box>
    </VStack>
  );
};

export default BlogPage;
