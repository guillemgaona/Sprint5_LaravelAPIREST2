import React from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

const ExerciseCardSkeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      _dark={{ bg: "gray.700" }}
      borderRadius="md"
    >
      <Skeleton height="20px" width="70%" mb="4" />
      
      <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ExerciseCardSkeleton;