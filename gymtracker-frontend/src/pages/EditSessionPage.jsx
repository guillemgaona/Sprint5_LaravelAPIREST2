import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSessionById, updateSession } from '../api/sessionService';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const EditSessionPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSessionById(sessionId)
      .then(response => {
        const session = response.data.data;
        setFormData({ date: session.date, notes: session.notes || '' });
      })
      .catch(() => setError('Failed to load session data.'))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSession(sessionId, formData);
      navigate(`/app/sessions`);
    } catch (err) {
      setError('Failed to update session.');
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={8} maxWidth="700px" margin="50px auto" borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Heading as="h1">Edit Training Session</Heading>
        {error && <Alert status="error"><AlertIcon />{error}</Alert>}
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={formData.date} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea name="notes" placeholder="How did the session go?" value={formData.notes} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full" mt={4}>Save Changes</Button>
      </VStack>
    </Box>
  );
};

export default EditSessionPage;