// src/pages/SessionsPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchMySessions } from '../api/sessionService';
import {
  Box, Heading, Button, VStack, HStack, Text, Spinner, Alert, AlertIcon, Link, Flex // <-- AÑADIR FLEX AQUÍ
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await fetchMySessions();
        setSessions(response.data.data);
      } catch (err) {
        setError('Failed to fetch sessions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getSessions();
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1">My Training Sessions</Heading>
        <Button as={RouterLink} to="/sessions/new" colorScheme="blue">
          Log New Session
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Box key={session.id} p={5} shadow="md" borderWidth="1px">
              <HStack justify="space-between">
                <Heading fontSize="xl">{`Session on ${session.date}`}</Heading>
                {/* <Link as={RouterLink} to={`/sessions/${session.id}`} color="blue.500">View Details</Link> */}
              </HStack>
              <Text mt={4}>{session.notes || 'No notes for this session.'}</Text>
            </Box>
          ))
        ) : (
          <Text>You haven't logged any sessions yet.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default SessionsPage;