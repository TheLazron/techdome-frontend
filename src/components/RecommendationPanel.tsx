import { Box, Flex } from "@chakra-ui/react";
import RecommendationCard from "./ui/RecommendationCard";

const RecommendationPanel = () => {
  return (
    <Flex overflowX="auto" flexWrap="nowrap">
      <RecommendationCard
        title="Sample Title"
        description="Sample Description"
      />
      <RecommendationCard
        title="Sample Title"
        description="Sample Description"
      />
      <RecommendationCard
        title="Sample Title"
        description="Sample Description"
      />
    </Flex>
  );
};

export default RecommendationPanel;
