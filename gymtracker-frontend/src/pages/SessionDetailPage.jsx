import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchSessionById } from '../api/sessionService';
import { fetchExercises } from '../api/exerciseService';
import { createSet, deleteSet } from '../api/setService';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  IconButton,
  useToast,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const SessionDetailPage = () => {
  const { sessionId } = useParams(); // Obtiene el ID de la sesión desde la URL
  const [session, setSession] = useState(null);
  const [sets, setSets] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  // Estado para el formulario de añadir una nueva serie
  const [newSetData, setNewSetData] = useState({
    exercise_id: '',
    set_number: 1,
    repetitions: 10,
    weight: 20,
  });

  // Función para cargar todos los datos necesarios para la página
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // Hacemos las peticiones de sesión y ejercicios en paralelo para más eficiencia
      const [sessionRes, exercisesRes] = await Promise.all([
        fetchSessionById(sessionId),
        fetchExercises(),
      ]);

      const sessionData = sessionRes.data.data;
      const exercisesData = exercisesRes.data.data;

      setSession(sessionData);
      setSets(sessionData.sets || []); // Asumimos que la API devuelve los sets anidados
      setExercises(exercisesData);

      // Pre-seleccionar el primer ejercicio en el formulario
      if (exercisesData.length > 0) {
        setNewSetData((prev) => ({ ...prev, exercise_id: exercisesData[0].id }));
      }
    } catch (err) {
      setError('Failed to fetch session details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // useEffect para ejecutar la carga de datos cuando el componente se monta
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Manejador para los cambios en el formulario de nueva serie
  const handleNewSetChange = (e) => {
    setNewSetData({ ...newSetData, [e.target.name]: e.target.value });
  };

  // Manejador para enviar el formulario y crear una nueva serie
  const handleAddSet = async (e) => {
    e.preventDefault();
    if (!newSetData.exercise_id) {
        toast({ title: 'Please select an exercise.', status: 'warning', duration: 3000, isClosable: true });
        return;
    }
    try {
      const response = await createSet(sessionId, newSetData);
      // Añadir la nueva serie a la lista sin recargar la página
      setSets((currentSets) => [...currentSets, response.data.data]);
      // Resetear el formulario y aumentar el número de serie para la siguiente
      setNewSetData((prev) => ({
        ...prev,
        set_number: Number(prev.set_number) + 1,
        repetitions: 10,
        weight: 20,
      }));
      toast({ title: 'Set added successfully!', status: 'success', duration: 2000, isClosable: true });
    } catch (err) {
      toast({ title: 'Error adding set.', description: 'Please try again.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  // Manejador para borrar una serie
  const handleDeleteSet = async (setId) => {
    if (window.confirm('Are you sure you want to delete this set?')) {
      try {
        await deleteSet(setId);
        // Quitar la serie de la lista sin recargar la página
        setSets((currentSets) => currentSets.filter((s) => s.id !== setId));
        toast({
          title: 'Set deleted.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Error deleting set.',
          description: 'Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Renderizado condicional mientras cargan los datos
  if (loading) return <Spinner size="xl" display="block" mx="auto" mt="20" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;
  if (!session) return <Text>Session not found.</Text>;

  // Renderizado principal de la página
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h1" mb={2}>{`Session on ${session.date}`}</Heading>
          <Text fontSize="lg" color="gray.600">{session.notes || 'No notes for this session.'}</Text>
        </Box>
        <Button as={RouterLink} to={`/sessions/${sessionId}/edit`}>Edit Session Details</Button>
      </Flex>
      
      {/* Formulario para Añadir Nueva Serie */}
      <Box as="form" onSubmit={handleAddSet} p={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Add New Set</Heading>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} alignItems="end">
          <FormControl isRequired>
            <FormLabel>Exercise</FormLabel>
            <Select name="exercise_id" value={newSetData.exercise_id} onChange={handleNewSetChange}>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Set #</FormLabel>
            <NumberInput name="set_number" value={newSetData.set_number} min={1} onChange={(val) => handleNewSetChange({ target: { name: 'set_number', value: val } })}>
                <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Reps</FormLabel>
            <NumberInput name="repetitions" value={newSetData.repetitions} min={0} onChange={(val) => handleNewSetChange({ target: { name: 'repetitions', value: val } })}>
                <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Weight (kg)</FormLabel>
            <NumberInput name="weight" value={newSetData.weight} min={0} step={0.25} precision={2} onChange={(val) => handleNewSetChange({ target: { name: 'weight', value: val } })}>
                <NumberInputField />
            </NumberInput>
          </FormControl>
          <Button type="submit" colorScheme="green">Add Set</Button>
        </SimpleGrid>
      </Box>

      {/* Listado de Series Existentes */}
      <Heading as="h2" size="lg" mt={8} mb={4}>Logged Sets</Heading>
      <VStack spacing={4} align="stretch">
        {sets.length > 0 ? (
          sets.sort((a,b) => a.id - b.id).map((set) => ( // Ordenar por ID para ver los nuevos al final
            <Flex key={set.id} p={4} shadow="sm" borderWidth="1px" borderRadius="md" justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{set.exercise?.name || 'Exercise not found'}</Text>
                <Text>Set {set.set_number}: {set.repetitions} reps at {set.weight} kg</Text>
              </Box>
              <IconButton icon={<FaTrash />} aria-label="Delete set" size="sm" colorScheme="red" variant="ghost" onClick={() => handleDeleteSet(set.id)} />
            </Flex>
          ))
        ) : (
          <Text>No sets have been logged for this session yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default SessionDetailPage;