import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Track your progress, <br />
            <Text as={'span'} color={'blue.400'}>
              unleash your potential
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Stop guessing, start gaining. GymTracker is your ultimate companion
            to log your workouts, visualize your statistics, and consistently
            achieve your fitness goals one rep at a time.
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={4}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            {}
            <Button
              as={RouterLink}
              to="/login"
              colorScheme={'blue'}
              bg={'blue.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Login
            </Button>
            
            {}
            <Button as={RouterLink} to="/register" variant={'link'} colorScheme={'blue'} size={'sm'}>
              Create an Account
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}