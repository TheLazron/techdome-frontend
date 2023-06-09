import {
  Badge,
  Card,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  description: string;
  tags: string[];
  createdOn: Date;
}

const BlogCard = ({
  title,
  description,
  tags,
  createdOn,
}: BlogCardProps): JSX.Element => {
  console.log(title, description, tags, createdOn);

  return (
    <Card p={4} bg="gray.200">
      <Flex
        direction={useBreakpointValue({ base: "column", md: "row" })}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex
          direction="column"
          gap={2}
          alignItems={useBreakpointValue({ base: "center", md: "flex-start" })}
        >
          <Heading textAlign={"center"} size="lg">
            {title}
          </Heading>
          <Text>{description}</Text>
        </Flex>
        <Flex
          direction="column"
          alignItems={useBreakpointValue({ base: "center", md: "flex-end" })}
          gap={2}
        >
          <Flex gap={2}>
            {tags.map((tag: string) => {
              return <Badge colorScheme="purple">{tag}</Badge>;
            })}
          </Flex>
          <Text>{format(createdOn, "d MMMM yyyy")}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

// const TAGS = ["fist blog", "john"];

export default BlogCard;
