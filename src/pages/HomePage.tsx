import {
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";
import { Blog, User } from "../types/blogTypes";
import BlogCard from "../components/ui/BlogCard";
import DividerComponent from "../components/ui/Divider";
import UserCard from "../components/ui/UserCard";

const HomePage = (): JSX.Element => {
  const { jwtToken } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await makeAuthenticatedRequest(
        "http://localhost:3300/get-paginated-blogs",
        {},
        "GET",
        jwtToken
      );
      console.log(data);
      setBlogs(data.data);
    };
    const fetchUsers = async () => {
      const data = await makeAuthenticatedRequest(
        "http://localhost:3300/get-user-list",
        {},
        "GET",
        jwtToken
      );
      console.log(data);
      setUsers(data.data);
    };

    fetchBlogs();
    fetchUsers();
  }, []);

  return (
    <Flex direction={"column"} width="100%">
      <Flex direction="column" mx="5" alignItems={"center"} mt={8}>
        <Flex direction="column" w="80%" gap={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"md"} alignSelf={"flex-start"} color={"brand.black"}>
              Quick Reads For You
            </Heading>
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
            // <UserCard />
          )}
        </Flex>
      </Flex>
      <DividerComponent />
      <Flex direction="column" mx="5" alignItems={"center"} mt={8}>
        <Flex direction="column" w="80%" gap={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"md"} alignSelf={"flex-start"} color={"brand.black"}>
              Check Out These Authors
            </Heading>
          </Flex>
          <SimpleGrid minChildWidth="180px" spacing="40px">
            {!blogs ? (
              <Spinner />
            ) : (
              users.map((user: User) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  profileUrl={user.profileUrl}
                  blogs={user.blogs}
                />
              ))
            )}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
    //   </Flex>
    //   <Flex direction={"column"}>
    //     <Heading fontSize={"2xl"}>Check Out These Authors</Heading>
    //   </Flex>
    // </Flex>
  );
};

export default HomePage;
