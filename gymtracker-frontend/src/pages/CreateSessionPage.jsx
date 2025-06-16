// src/pages/CreateSessionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../api/sessionService';
import {
  Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, Alert, AlertIcon,
} from '@chakra-ui/react';

const CreateSessionPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createSession({ date, notes });
      navigate('/sessions'); // Redirigir a la lista de sesiones
    } catch (err) {
      setError('Failed to create session. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box p={8} maxWidth="700px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="50px auto">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Heading as="h1" size="lg">Log New Training Session</Heading>
        {error && <Alert status="error"><AlertIcon />{error}</Alert>}
        
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea placeholder="How did the session go?" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Save Session
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateSessionPage;