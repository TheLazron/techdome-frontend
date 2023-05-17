import { Badge, Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";

interface RecommendationCardProps {
  title: string;
  description: string;
}

const RecommendationCard = ({
  title,
  description,
}: RecommendationCardProps): JSX.Element => {
  console.log(title, description);

  return (
    <Card p={2} bg="white" m={4} w={"50%"}>
      <Flex gap={4} justifyContent="space-between" alignItems="center">
        <Box height="5rem" flex={1} rounded="md">
          <Image
            borderRadius="md"
            src="https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>
        <Flex direction="column" flex={1}>
          <Heading fontSize="lg">sample Title</Heading>
          <Text fontSize={"md"}>Sample Text</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

// const TAGS = ["fist blog", "john"];

export default RecommendationCard;
