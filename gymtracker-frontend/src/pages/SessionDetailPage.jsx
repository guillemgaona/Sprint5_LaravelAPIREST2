import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchSessionById } from '../api/sessionService';
import { fetchAllExercises } from '../api/exerciseService';
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
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditSetModal from '../components/EditSetModal';

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const toast = useToast();

  const [session, setSession] = useState(null);
  const [sets, setSets] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newSetData, setNewSetData] = useState({
    exercise_id: '',
    set_number: 1,
    repetitions: 10,
    weight: 20,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSet, setEditingSet] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [sessionRes, exercisesData] = await Promise.all([
        fetchSessionById(sessionId),
        fetchAllExercises(),
      ]);
      const sessionData = sessionRes.data.data;
      setSession(sessionData);
      setSets(sessionData.sets || []);
      setExercises(exercisesData);
      if (exercisesData.length > 0) {
        setNewSetData((prev) => ({ ...prev, exercise_id: exercisesData[0].id }));
      }
    } catch (err) {
      setError('Failed to fetch session details.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenEditModal = (set) => {
    setEditingSet(set);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSet(null);
  };
  const handleSetUpdated = (updatedSet) => {
    setSets(currentSets =>
      currentSets.map(s => (s.id === updatedSet.id ? updatedSet : s))
    );
  };
  const handleNewSetChange = (e) => {
    setNewSetData({ ...newSetData, [e.target.name]: e.target.value });
  };
  const handleDeleteSet = async (setId) => {
    if (window.confirm('Are you sure you want to delete this set?')) {
        try {
            await deleteSet(setId);
            setSets((currentSets) => currentSets.filter((s) => s.id !== setId));
            toast({ title: 'Set deleted.', status: 'info', duration: 3000, isClosable: true });
        } catch (err) {
            toast({ title: 'Error deleting set.', status: 'error', duration: 3000, isClosable: true });
        }
    }
  };

  const handleAddSet = async (e) => {
    e.preventDefault();
    if (!newSetData.exercise_id) {
        toast({ title: 'Please select an exercise.', status: 'warning', duration: 3000, isClosable: true });
        return;
    }
    try {
      const response = await createSet(sessionId, newSetData);
      setSets((currentSets) => [...currentSets, response.data.data]);
      setNewSetData((prev) => ({
        ...prev,
        set_number: 1,
        repetitions: 10,
        weight: 20,
      }));
      toast({ title: 'Set added successfully!', status: 'success', duration: 2000, isClosable: true });
    } catch (err) {
      toast({ title: 'Error adding set.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (loading) return <Spinner size="xl" display="block" mx="auto" mt="20" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;
  if (!session) return <Text>Session not found.</Text>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h1" mb={2}>{`Session on ${session.date}`}</Heading>
          <Text fontSize="lg" color="gray.600">{session.notes || 'No notes for this session.'}</Text>
        </Box>
        <Button as={RouterLink} to={`/app/sessions/${sessionId}/edit`}>Edit Session Details</Button>
      </Flex>
      
      {/* Formulario para Añadir Nueva Serie */}
      <Box as="form" onSubmit={handleAddSet} p={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Add New Set</Heading>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} alignItems="end">
          <FormControl isRequired>
            <FormLabel>Exercise</FormLabel>
            <Select name="exercise_id" value={newSetData.exercise_id} onChange={handleNewSetChange}>
              {exercises.map((ex) => (<option key={ex.id} value={ex.id}>{ex.name}</option>))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Number of sets</FormLabel>
            <NumberInput name="set_number" value={newSetData.set_number} min={1} onChange={(val) => handleNewSetChange({ target: { name: 'set_number', value: val } })}>
                <NumberInputField />
            </NumberInput>
          </FormControl>
          
          {/* --- INICIO DE LA CORRECCIÓN --- */}
          {/* Estos eran los campos que faltaban */}
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
          {/* --- FIN DE LA CORRECCIÓN --- */}

          <Button type="submit" colorScheme="green">Add Set</Button>
        </SimpleGrid>
      </Box>

      {/* --- INICIO DE LA CORRECCIÓN --- */}
      {/* Esta era la sección del listado que faltaba */}
      <Heading as="h2" size="lg" mt={8} mb={4}>Logged Sets</Heading>
      <VStack spacing={4} align="stretch">
        {sets.length > 0 ? (
          sets.sort((a, b) => a.id - b.id).map((set) => (
            <Flex key={set.id} p={4} shadow="sm" borderWidth="1px" borderRadius="md" justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{set.exercise?.name || 'Exercise not found'}</Text>
                <Text>Set {set.set_number}: {set.repetitions} reps at {set.weight} kg</Text>
              </Box>
              <HStack>
                <IconButton icon={<FaEdit />} aria-label="Edit set" size="sm" variant="ghost" onClick={() => handleOpenEditModal(set)} />
                <IconButton icon={<FaTrash />} aria-label="Delete set" size="sm" colorScheme="red" variant="ghost" onClick={() => handleDeleteSet(set.id)} />
              </HStack>
            </Flex>
          ))
        ) : (
          <Text>No sets have been logged for this session yet.</Text>
        )}
      </VStack>
      {/* --- FIN DE LA CORRECCIÓN --- */}

      {/* El Modal de Edición */}
      {editingSet && (
        <EditSetModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          setToEdit={editingSet}
          onSetUpdated={handleSetUpdated}
        />
      )}
    </Box>
  );
};

export default SessionDetailPage;