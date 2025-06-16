// src/pages/admin/CreateExercisePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExercise } from '../../api/adminService';
import {
  Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast,
} from '@chakra-ui/react';

const CreateExercisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    muscle_group: 'chest',
    description: '',
    demo_image_url: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExercise(formData);
      toast({ title: 'Exercise created successfully!', status: 'success', duration: 3000, isClosable: true });
      navigate('/exercises');
    } catch (error) {
      toast({ title: 'Error creating exercise.', description: 'Please check your data.', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Box p={8} maxWidth="700px" margin="50px auto" borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Heading as="h1">Create New Exercise</Heading>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Muscle Group</FormLabel>
          <Select name="muscle_group" onChange={handleChange} value={formData.muscle_group}>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Demo Image URL</FormLabel>
          <Input type="url" name="demo_image_url" placeholder="http://example.com/image.jpg" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full" mt={4}>Save Exercise</Button>
      </VStack>
    </Box>
  );
};

export default CreateExercisePage;