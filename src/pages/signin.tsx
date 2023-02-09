import {
  Flex, Box, Center, Heading, Button, Text
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { authOptions } from '../pages/api/auth/[...nextauth]';

import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

// lazy type inferance from nextAuth doc
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function SignIn({ providers }:Props) {
  return (
    <Center>
      <Flex alignItems='center' justifyContent='center' h='container.sm'>
        <Box textAlign='center'>
          <NextLink href='/'>
            <Heading size='xl' mb='4' textAlign='center'>💰</Heading>
          </NextLink>
          <Text fontSize='xl' pb='5'>
            Sign in to BudTrackr
          </Text>
          {Object.values(providers).map((provider) => (
            <Button
              key={provider.id}
              colorScheme='blue'
              onClick={() => signIn(provider.id)}
              fontWeight='medium'
              fontSize='sm'
              minWidth='xs'
            >
              Sign in with {provider.name}
            </Button>
          ))}
        </Box>
      </Flex>
    </Center>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession( 
    context.req,
    context.res,
    authOptions,
  );

  if (session)
    return { redirect: { destination: '/' } };
  
  const providers = await getProviders();
  return {
    props: {
      providers: providers ?? []
    },
  };
};
