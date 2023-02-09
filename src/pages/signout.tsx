import {
  Flex, Box, Stack, Center, Heading, Button, Text
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  const router = useRouter();

  return (
    <Center>
      <Flex alignItems='center' justifyContent='center' h='container.sm'>
        <Box textAlign='center'>
          <NextLink href='/'>
            <Heading size='xl' mb='4' textAlign='center'>💰</Heading>
          </NextLink>
          <Text fontSize='xl' pb='5'>
            Do you want to sign out?
          </Text>
          <Stack>
          <Button
            colorScheme='blackAlpha'
            onClick={() => signOut()}
            fontWeight='medium'
            fontSize='sm'
            minWidth='xs'
          >
            Sign out
          </Button>
          <Button
            variant='outline'
            colorScheme='blackAlpha'
            onClick={() => router.push('/')}
            fontWeight='medium'
            fontSize='sm'
            minWidth='xs'
          >
            Return to Home
          </Button>
            </Stack>
        </Box>
      </Flex>
    </Center>
  );
};

