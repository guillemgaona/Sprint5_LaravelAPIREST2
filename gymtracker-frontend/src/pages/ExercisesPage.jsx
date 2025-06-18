import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchExercises } from '../api/exerciseService';
import { deleteExercise } from '../api/adminService';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Button,
  IconButton,
  useToast,
  HStack,
  Link,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ExerciseCardSkeleton from '../components/ExerciseCardSkeleton'; 

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState(null);

  const { user } = useAuth();
  const toast = useToast();
  const isAdmin = user?.roles?.includes('admin');

  const loadExercises = (page) => {
    setLoading(true);
    fetchExercises(page)
      .then(response => {
        setExercises(response.data.data);
        setPaginationMeta(response.data.meta);
      })
      .catch(() => setError('Failed to fetch exercises.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExercises(currentPage);
  }, [currentPage]);

  const handleDelete = async (exerciseId) => {
  };

  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">Exercise List</Heading>
        {isAdmin && (
          <Button as={RouterLink} to="/app/admin/exercises/new" colorScheme="green" leftIcon={<FaPlus />}>
            Create Exercise
          </Button>
        )}
      </Flex>
      
      {}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <ExerciseCardSkeleton key={index} />
          ))
        ) : (
          exercises.map((exercise) => (
            <Link
              as={RouterLink}
              to={`/app/exercises/${exercise.id}`}
              key={exercise.id}
              _hover={{ textDecoration: 'none' }}
            >
              <Card h="100%" position="relative" overflow="hidden" _hover={{ transform: 'scale(1.03)', shadow: 'xl' }} transition="transform 0.2s, box-shadow 0.2s">
                {isAdmin && (
                  <HStack position="absolute" top={2} right={2} onClick={(e) => e.preventDefault()}>
                    <IconButton as={RouterLink} to={`/app/admin/exercises/${exercise.id}/edit`} icon={<FaEdit />} size="sm" aria-label="Edit Exercise" />
                    <IconButton icon={<FaTrash />} size="sm" colorScheme="red" aria-label="Delete Exercise" onClick={() => handleDelete(exercise.id)} />
                  </HStack>
                )}
                <CardHeader><Heading size="md">{exercise.name}</Heading></CardHeader>
                <CardBody>
                  <Text><strong>Muscle Group:</strong> {exercise.muscle_group}</Text>
                  <Text mt={2}>{exercise.description || 'No description available.'}</Text>
                </CardBody>
              </Card>
            </Link>
          ))
        )}
      </SimpleGrid>

      {}
      {!loading && paginationMeta && paginationMeta.last_page > 1 && (
        <Flex justify="center" align="center" mt={8}>
          <Button
            onClick={() => setCurrentPage(prev => prev - 1)}
            isDisabled={!paginationMeta || paginationMeta.current_page === 1}
            leftIcon={<FaArrowLeft />}
            mr={4}
          >
            Previous
          </Button>
          <Text>
            Page {paginationMeta?.current_page} of {paginationMeta?.last_page}
          </Text>
          <Button
            onClick={() => setCurrentPage(prev => prev + 1)}
            isDisabled={!paginationMeta || paginationMeta.current_page === paginationMeta.last_page}
            rightIcon={<FaArrowRight />}
            ml={4}
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ExercisesPage;