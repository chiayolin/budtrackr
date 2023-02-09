import { Box, Container, Text } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode,
}

export default function Layout({ children }:Props) {
  return (
    <Container>
      <Navbar />
      {children}
      <Box textAlign='center' mt='8' mb='8'>
        <Text fontSize='sm' color='gray'>
          © BudTrackr 2023
        </Text>
      </Box>
    </Container>
    );
}
