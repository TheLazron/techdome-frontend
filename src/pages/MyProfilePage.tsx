import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import BlogCard from "../components/ui/BlogCard";
import { NavLink } from "react-router-dom";
import { loggedUser, useAuth } from "../context/userContext";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { Blog } from "../types/blogTypes";

const MyProfilePage = (): JSX.Element => {
  const { jwtToken } = useAuth();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await makeAuthenticatedRequest(
        "http://localhost:3300/get-my-blogs",
        {},
        "GET",
        jwtToken
      );
      console.log(data);
      setBlogs(data.data);
    };

    fetchBlogs();
  }, []);

  return (
    <Flex color="brand.primary" width="100%" direction={"column"}>
      <Box
        height={"30%"}
        display={"flex"}
        width={"100%"}
        bgImage="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        backgroundSize="cover"
        backgroundPosition="center"
        alignItems="center"
        pl={20}
      >
        <UserProfileHeader />
      </Box>
      <Flex direction="column" mx="5" alignItems={"center"} mt={8}>
        <Flex direction="column" w="70%" gap={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"lg"} alignSelf={"flex-start"} color={"brand.black"}>
              My Blogs
            </Heading>
            <Button bgColor="brand.black">+Create New</Button>
          </Flex>
          {!blogs ? (
            <Spinner />
          ) : (
            blogs.map((blog: Blog) => (
              <NavLink to={`/blog/${blog.id}`} key={blog.id}>
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  tags={blog.tags}
                  createdOn={new Date(blog.createdOn)}
                />
              </NavLink>
            ))
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyProfilePage;
