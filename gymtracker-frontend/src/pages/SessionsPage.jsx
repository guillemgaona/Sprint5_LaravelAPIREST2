import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchMySessions, deleteSession } from '../api/sessionService';
import {
  Box, Heading, Button, VStack, Text, Spinner, Alert, AlertIcon, Flex, HStack, IconButton, useToast
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchMySessions()
      .then(response => setSessions(response.data.data))
      .catch(() => setError('Failed to fetch sessions.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session and all its sets?')) {
      try {
        await deleteSession(sessionId);
        setSessions(currentSessions => currentSessions.filter(s => s.id !== sessionId));
        toast({ title: 'Session deleted successfully.', status: 'success', duration: 3000, isClosable: true });
      } catch (err) {
        toast({ title: 'Error deleting session.', status: 'error', duration: 3000, isClosable: true });
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">My Training Sessions</Heading>
        <Button as={RouterLink} to="/app/sessions/new" colorScheme="blue">Log New Session</Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {sessions.length > 0 ? sessions.map((session) => (
          <Box key={session.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box as={RouterLink} to={`/app/sessions/${session.id}`} _hover={{ textDecoration: 'none' }}>
                <Heading fontSize="xl">{`Session on ${session.date}`}</Heading>
                <Text mt={2} color="gray.600">{session.notes || 'No notes.'}</Text>
              </Box>
              <HStack spacing={2}>
                <IconButton as={RouterLink} to={`/app/sessions/${session.id}/edit`} icon={<FaEdit />} aria-label="Edit session" />
                <IconButton icon={<FaTrash />} colorScheme="red" aria-label="Delete session" onClick={() => handleDeleteSession(session.id)} />
              </HStack>
            </Flex>
          </Box>
        )) : <Text>You haven't logged any sessions yet.</Text>}
      </VStack>
    </Box>
  );
};

export default SessionsPage;