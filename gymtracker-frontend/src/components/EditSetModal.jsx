// src/components/EditSetModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, NumberInput, NumberInputField, VStack, useToast
} from '@chakra-ui/react';
import { updateSet } from '../api/setService';

const EditSetModal = ({ isOpen, onClose, setToEdit, onSetUpdated }) => {
  const [formData, setFormData] = useState({ repetitions: '', weight: '' });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Cada vez que el modal se abre con una nueva serie, actualizamos el estado del formulario
  useEffect(() => {
    if (setToEdit) {
      setFormData({
        repetitions: setToEdit.repetitions,
        weight: setToEdit.weight,
      });
    }
  }, [setToEdit]);

  const handleChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await updateSet(setToEdit.id, formData);
      onSetUpdated(response.data.data); // Llama al callback con la serie actualizada
      toast({ title: 'Set updated!', status: 'success', duration: 2000, isClosable: true });
      onClose(); // Cierra el modal
    } catch (error) {
      toast({ title: 'Error updating set', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Edit Set #{setToEdit?.set_number}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Repetitions</FormLabel>
              <NumberInput
                value={formData.repetitions}
                min={0}
                onChange={(val) => handleChange(val, 'repetitions')}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Weight (kg)</FormLabel>
              <NumberInput
                value={formData.weight}
                min={0}
                step={0.25}
                precision={2}
                onChange={(val) => handleChange(val, 'weight')}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSetModal;