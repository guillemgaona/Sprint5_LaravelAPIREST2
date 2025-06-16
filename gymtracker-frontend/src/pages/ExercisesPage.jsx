// src/pages/ExercisesPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../api/exerciseService';
import {
  Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await fetchExercises();
        setExercises(response.data.data); // Acceder a la data del paginador
      } catch (err) {
        setError('Failed to fetch exercises.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getExercises();
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading as="h1" mb={6}>Exercise List</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {exercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader><Heading size="md">{exercise.name}</Heading></CardHeader>
            <CardBody>
              <Text><strong>Muscle Group:</strong> {exercise.muscle_group}</Text>
              <Text>{exercise.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ExercisesPage;