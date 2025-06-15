// src/pages/SessionDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSessionById } from '../api/sessionService';
import { deleteSet } from '../api/setService';
import {
  Box, Heading, Text, VStack, HStack, Spinner, Alert, AlertIcon, IconButton, useToast
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
// Nota: Para el formulario de añadir/editar series, necesitarás más componentes y lógica.
// Para mantenerlo simple, mostraremos la lista y la función de borrado.
// El formulario de creación se puede añadir como un componente separado.

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  const loadSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchSessionById(sessionId);
      setSession(response.data.data);
      // Asumiendo que tu API devuelve los sets anidados en la sesión
      setSets(response.data.data.sets || []); 
    } catch (err) {
      setError('Failed to fetch session details.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const handleDeleteSet = async (setId) => {
    if (window.confirm('Are you sure you want to delete this set?')) {
      try {
        await deleteSet(setId);
        setSets(currentSets => currentSets.filter(s => s.id !== setId));
        toast({
          title: 'Set deleted.',
          status: 'success',
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

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;
  if (!session) return <Text>Session not found.</Text>;

  return (
    <Box>
      <Heading as="h1" mb={2}>{`Session on ${session.date}`}</Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>{session.notes || 'No notes for this session.'}</Text>
      
      {/* Aquí iría un formulario para añadir nuevas series. Ej: <AddSetForm sessionId={sessionId} onSetAdded={loadSession} /> */}
      
      <Heading as="h2" size="lg" mt={8} mb={4}>Logged Sets</Heading>
      <VStack spacing={4} align="stretch">
        {sets.length > 0 ? (
          sets.map((set) => (
            <Flex key={set.id} p={4} shadow="md" borderWidth="1px" justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{set.exercise?.name || 'Exercise not found'}</Text>
                <Text>Set {set.set_number}: {set.repetitions} reps at {set.weight} kg</Text>
              </Box>
              <HStack>
                {/* <IconButton icon={<FaEdit />} aria-label="Edit set" onClick={() => alert('Edit not implemented yet.')}/> */}
                <IconButton icon={<FaTrash />} aria-label="Delete set" colorScheme="red" onClick={() => handleDeleteSet(set.id)} />
              </HStack>
            </Flex>
          ))
        ) : (
          <Text>No sets logged for this session yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default SessionDetailPage;