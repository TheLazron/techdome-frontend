import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface BlogHeaderProps {
  title: string;
}

const BlogHeader = ({ title }: BlogHeaderProps) => {
  const fontSize = useBreakpointValue({ base: "xl", md: "6xl" });
  const letterSpacing = useBreakpointValue({ base: 10, md: 20 });

  return (
    <Flex
      height={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent="center"
      bgImage="https://images.unsplash.com/photo-1595818965767-b3bf39338fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"
      bgSize="cover"
      mx={2}
    >
      <Heading
        fontWeight={"thin"}
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        textAlign={"center"}
      >
        {`${title}`.toUpperCase()}
      </Heading>
      <Stack
        direction={"row"}
        gap={useBreakpointValue({ base: 5, md: 20 })}
        mt={5}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            as={StarIcon}
            color="#FFF510"
            boxSize={{ base: 5, md: 10 }}
          />
        ))}
        {/* <Icon
          as={StarIcon}
          color="#FFF510"
          boxSize={useBreakpointValue({ base: 5, md: 10 })}
        /> */}
      </Stack>
      <Text fontSize={"xl"} fontWeight={"bold"} top={20} position={"relative"}>
        1 million+ reads
      </Text>
    </Flex>
  );
};

export default BlogHeader;
