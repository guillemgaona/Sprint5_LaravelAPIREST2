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
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await deleteExercise(exerciseId);
        toast({ title: 'Exercise deleted.', status: 'success', duration: 2000, isClosable: true });
        // Si estamos en la última página y borramos el último item, volvemos a la página anterior
        if (exercises.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          loadExercises(currentPage);
        }
      } catch (err) {
        toast({ title: 'Error deleting exercise.', status: 'error', duration: 3000, isClosable: true });
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">Exercise List</Heading>
        {isAdmin && (
          <Button as={RouterLink} to="/admin/exercises/new" colorScheme="green" leftIcon={<FaPlus />}>
            Create Exercise
          </Button>
        )}
      </Flex>
      
      {/* --- INICIO DE LA CORRECCIÓN --- */}
      {/* Esta es la parte que faltaba: el renderizado de la lista */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {exercises.map((exercise) => (
          <Card key={exercise.id} position="relative" overflow="hidden">
            {isAdmin && (
              <HStack position="absolute" top={2} right={2}>
                <IconButton as={RouterLink} to={`/admin/exercises/${exercise.id}/edit`} icon={<FaEdit />} size="sm" aria-label="Edit Exercise" />
                <IconButton icon={<FaTrash />} size="sm" colorScheme="red" aria-label="Delete Exercise" onClick={() => handleDelete(exercise.id)} />
              </HStack>
            )}
            <CardHeader><Heading size="md">{exercise.name}</Heading></CardHeader>
            <CardBody>
              <Text><strong>Muscle Group:</strong> {exercise.muscle_group}</Text>
              <Text mt={2}>{exercise.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {/* --- FIN DE LA CORRECCIÓN --- */}

      {/* Controles de Paginación */}
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
    </Box>
  );
};

export default ExercisesPage;