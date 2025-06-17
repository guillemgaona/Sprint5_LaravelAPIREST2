import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExerciseById } from '../api/exerciseService';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Image,
  Tag,
  Button,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

const ExerciseDetailPage = () => {
  const { exerciseId } = useParams(); // Obtiene el ID de la URL
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cuando el componente se monta, busca los datos del ejercicio por su ID
    fetchExerciseById(exerciseId)
      .then(response => {
        setExercise(response.data.data);
      })
      .catch(() => {
        setError('Failed to fetch exercise details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [exerciseId]); // Se vuelve a ejecutar si el ID en la URL cambia

  if (loading) return <Spinner size="xl" display="block" mx="auto" mt="20" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;
  if (!exercise) return <Heading>Exercise not found.</Heading>;

  return (
    <Box>
      <Button onClick={() => navigate(-1)} leftIcon={<FaArrowLeft />} mb={6}>
        Back to List
      </Button>

      <VStack spacing={4} align="start">
        <Heading as="h1" size="2xl">{exercise.name}</Heading>
        
        <Tag size="lg" colorScheme="blue" borderRadius="full">
          {exercise.muscle_group.charAt(0).toUpperCase() + exercise.muscle_group.slice(1)}
        </Tag>
        
        <Text fontSize="xl" color="gray.600">
          {exercise.description || 'No description available.'}
        </Text>

        {exercise.demo_image_url && (
          <Box mt={4}>
            <Heading as="h3" size="lg" mb={2}>Demonstration</Heading>
            <Image
              src={exercise.demo_image_url}
              alt={`Demonstration for ${exercise.name}`}
              borderRadius="md"
              boxShadow="lg"
              maxH="400px"
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ExerciseDetailPage;