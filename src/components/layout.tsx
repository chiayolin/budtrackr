import { Container } from '@chakra-ui/react';
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
    </Container>
    );
}
