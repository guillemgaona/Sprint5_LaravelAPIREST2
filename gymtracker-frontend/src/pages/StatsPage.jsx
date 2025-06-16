import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getVolumeStats, getFrequencyStats, getPersonalBests } from '../api/statsService';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react';

const StatsPage = () => {
  const { user } = useAuth(); // Obtiene el usuario desde el contexto de autenticación
  const [stats, setStats] = useState({ volume: [], frequency: [], prs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Esta guarda es crucial: no hace nada si el objeto 'user' aún no está disponible.
    if (!user || !user.id) {
      // Si el AuthContext todavía no ha cargado el usuario, esperamos.
      // Cuando `user` cambie de `null` a un objeto, este useEffect se ejecutará de nuevo.
      return;
    }

    const fetchAllStats = async () => {
      try {
        setLoading(true); // Muestra el spinner mientras se cargan los datos

        // Hacemos todas las peticiones en paralelo para mejorar el rendimiento
        const [volumeRes, frequencyRes, prsRes] = await Promise.all([
          getVolumeStats(user.id),
          getFrequencyStats(user.id),
          getPersonalBests(user.id),
        ]);

        setStats({
          volume: volumeRes.data.data,
          frequency: frequencyRes.data.data,
          prs: prsRes.data.data,
        });
      } catch (err) {
        setError('Failed to load stats. Please try again later.');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [user]); // El array de dependencias [user] asegura que esto se ejecute cuando `user` se cargue

  // Renderizado condicional
  if (loading) {
    return <Spinner size="xl" display="block" mx="auto" mt="20" />;
  }

  if (error) {
    return <Alert status="error"><AlertIcon />{error}</Alert>;
  }

  return (
    <Box>
      <Heading as="h1" mb={8}>Your Performance Stats</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        
        {/* Sección de Volumen Total */}
        <Box>
          <Heading size="lg" mb={4}>Total Volume by Muscle Group</Heading>
          <VStack spacing={4} align="stretch">
            {stats.volume.length > 0 ? (
              stats.volume.map((item) => (
                <Stat key={item.muscle_group} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
                  <StatLabel fontSize="md">{item.muscle_group.charAt(0).toUpperCase() + item.muscle_group.slice(1)}</StatLabel>
                  <StatNumber>{parseFloat(item.total_volume).toLocaleString()} kg</StatNumber>
                </Stat>
              ))
            ) : (
              <Text>No volume data yet. Go lift something!</Text>
            )}
          </VStack>
        </Box>

        {/* Sección de Récords Personales */}
        <Box>
          <Heading size="lg" mb={4}>Personal Records (Max Weight)</Heading>
          <TableContainer borderWidth="1px" borderRadius="md" boxShadow="sm">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Exercise</Th>
                  <Th isNumeric>Max Weight (kg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stats.prs.length > 0 ? (
                  stats.prs.map((pr) => (
                    <Tr key={pr.exercise_id}>
                      <Td>{pr.exercise_name}</Td>
                      <Td isNumeric>{pr.max_weight}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr><Td colSpan={2}>No personal records yet.</Td></Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>

      {/* Sección de Frecuencia de Sesiones */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>Session Frequency (Last 12 Weeks)</Heading>
        <TableContainer borderWidth="1px" borderRadius="md" boxShadow="sm">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Week</Th>
                <Th isNumeric>Sessions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats.frequency.length > 0 ? (
                stats.frequency.map((week) => (
                  <Tr key={`${week.year}-${week.week_number}`}>
                    <Td>{`Week of ${new Date(week.week_start_date).toLocaleDateString()}`}</Td>
                    <Td isNumeric>{week.session_count}</Td>
                  </Tr>
                ))
              ) : (
                <Tr><Td colSpan={2}>No session frequency data yet.</Td></Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default StatsPage;