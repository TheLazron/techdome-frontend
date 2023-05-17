import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import BlogCard from "../components/ui/BlogCard";
import { NavLink } from "react-router-dom";
import { loggedUser, useAuth } from "../context/userContext";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { Blog } from "../types/blogTypes";
import CreateBlogModal from "../components/AddBlogComponent";
import UserPopOver from "../components/userProfilePop";
// import { loggedUser, useAuth } from "../context/userContext";

const MyProfilePage = (): JSX.Element => {
  const { jwtToken } = useAuth();

  const { getCurrentUser } = useAuth();
  const user: loggedUser = getCurrentUser();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await makeAuthenticatedRequest(
        "https://techdome-backend-production.up.railway.app/get-my-blogs",
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
        height={"10rem"}
        display={"flex"}
        width={"100%"}
        bgImage="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        backgroundSize="cover"
        backgroundPosition="center"
        alignItems="center"
        pl={20}
      >
        <Flex>
          {user ? (
            <UserProfileHeader
              username={user.name!}
              profileUrl={user.profileUrl!}
              blogCount={user.blogCount!}
              email={user.email!}
            />
          ) : null}
          {user ? (
            <UserPopOver username={user.name!} profileUrl={user.profileUrl!} />
          ) : null}
        </Flex>
      </Box>
      <Flex direction="column" mx="5" alignItems={"center"} mt={8}>
        <Flex direction="column" w="70%" gap={5}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"lg"} alignSelf={"flex-start"} color={"brand.black"}>
              My Blogs
            </Heading>

            <CreateBlogModal />
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
