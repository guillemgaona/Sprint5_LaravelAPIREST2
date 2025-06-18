import React from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Button,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Box p={4}>
      <VStack spacing={2} align="start" mb={10}>
        <Heading as="h1" size="xl">
          Welcome back, {user?.name || 'User'}!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Ready for your next workout? Here's your control center.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        
        {}
        <Card borderWidth="1px" borderRadius="lg" boxShadow="md">
          <CardHeader>
            <Heading size="md">My Training Sessions</Heading>
          </CardHeader>
          <CardBody>
            <Text mb={4}>
              View, create, and manage your workout sessions and logged sets.
            </Text>
            <Button as={RouterLink} to="/app/sessions" colorScheme="blue">
              Go to My Sessions
            </Button>
          </CardBody>
        </Card>

        {}
        <Card borderWidth="1px" borderRadius="lg" boxShadow="md">
          <CardHeader>
            <Heading size="md">My Performance Stats</Heading>
          </CardHeader>
          <CardBody>
            <Text mb={4}>
              Track your progress, view personal records, and analyze your training volume.
            </Text>
            <Button as={RouterLink} to="/app/stats" colorScheme="green">
              View My Stats
            </Button>
          </CardBody>
        </Card>

        {}
        <Card borderWidth="1px" borderRadius="lg" boxShadow="md">
          <CardHeader>
            <Heading size="md">Browse Exercises</Heading>
          </CardHeader>
          <CardBody>
            <Text mb={4}>
              Explore the full list of available exercises to build your next workout.
            </Text>
            <Button as={RouterLink} to="/app/exercises" colorScheme="purple">
              Browse Exercises
            </Button>
          </CardBody>
        </Card>
        
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;