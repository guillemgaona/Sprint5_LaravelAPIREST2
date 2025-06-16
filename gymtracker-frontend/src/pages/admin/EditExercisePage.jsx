// src/pages/admin/EditExercisePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateExercise } from '../../api/adminService';
import { fetchExerciseById } from '../../api/exerciseService'; // Necesitas esta función en exerciseService.js
import {
  Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast, Spinner,
} from '@chakra-ui/react';

const EditExercisePage = () => {
  const { exerciseId } = useParams();
  const [formData, setFormData] = useState({ name: '', muscle_group: '', description: '', demo_image_url: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Añade fetchExerciseById a tu exerciseService.js
    // export const fetchExerciseById = (id) => axiosInstance.get(`/api/exercises/${id}`);
    fetchExerciseById(exerciseId)
      .then(response => {
        setFormData(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        toast({ title: 'Error loading exercise data.', status: 'error' });
        setLoading(false);
      });
  }, [exerciseId, toast]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExercise(exerciseId, formData);
      toast({ title: 'Exercise updated successfully!', status: 'success' });
      navigate('/exercises');
    } catch (error) {
      toast({ title: 'Error updating exercise.', status: 'error' });
    }
  };
  
  if (loading) return <Spinner />;

  return (
    <Box p={8} maxWidth="700px" margin="50px auto" borderWidth={1} borderRadius={8} boxShadow="lg">
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
        <Heading as="h1">Edit Exercise</Heading>
        {/* ... (el mismo formulario que en CreateExercisePage, pero usando 'value' del estado) ... */}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Muscle Group</FormLabel>
          <Select name="muscle_group" value={formData.muscle_group} onChange={handleChange}>
             <option value="chest">Chest</option>
             {/* ... otras opciones ... */}
          </Select>
        </FormControl>
        <FormControl><FormLabel>Description</FormLabel><Textarea name="description" value={formData.description} onChange={handleChange} /></FormControl>
        <FormControl><FormLabel>Demo Image URL</FormLabel><Input type="url" name="demo_image_url" value={formData.demo_image_url} onChange={handleChange} /></FormControl>
        <Button type="submit" colorScheme="blue" width="full" mt={4}>Save Changes</Button>
      </VStack>
    </Box>
  );
};

export default EditExercisePage;