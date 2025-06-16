// src/pages/ExercisesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchExercises } from '../api/exerciseService';
import { deleteExercise } from '../api/adminService'; // <-- Importar servicio de admin
import { useAuth } from '../hooks/useAuth'; // <-- Importar useAuth para saber el rol
import {
  Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Spinner, Alert, AlertIcon, Flex, Button, IconButton, useToast, HStack
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Obtener el usuario para comprobar su rol
  const toast = useToast();

  const isAdmin = user?.roles?.some(role => role.name === 'admin');

  const loadExercises = () => {
    setLoading(true);
    fetchExercises()
      .then(response => setExercises(response.data.data))
      .catch(() => setError('Failed to fetch exercises.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const handleDelete = async (exerciseId) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await deleteExercise(exerciseId);
        toast({ title: 'Exercise deleted.', status: 'success', duration: 2000, isClosable: true });
        loadExercises(); // Recargar la lista de ejercicios
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
        {/* El botón de crear solo es visible para el admin */}
        {isAdmin && (
          <Button as={RouterLink} to="/admin/exercises/new" colorScheme="green" leftIcon={<FaPlus />}>
            Create Exercise
          </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {exercises.map((exercise) => (
          <Card key={exercise.id} position="relative">
            {/* Los botones de editar/borrar solo son visibles para el admin */}
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
    </Box>
  );
};

export default ExercisesPage;