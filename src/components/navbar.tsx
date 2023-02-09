import { ChevronDownIcon, MinusIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
  Button,
  Text,
  Image,
  useColorMode,
  ButtonGroup
} from '@chakra-ui/react';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { data: session, status } = useSession();
  const router = useRouter();

  const signOutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/',
    });

    router.push(data.url);
  }

  return (
    <Flex mt='4' mb='8' alignItems='center'>
      <NextLink href='/'>
        <Heading size='md' fontWeight='normal'>💰 BudTrackr</Heading>
      </NextLink>
      <Spacer />
      <ButtonGroup>
        <Button size='sm'
          variant='ghost'
          onClick={toggleColorMode}
        >
          {
            colorMode === 'light' ?
              <MoonIcon />
              :
              <SunIcon />
          }
        </Button>
        {
          status === 'authenticated'
            ?
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  size='sm'
                  variant='outline'
                  fontWeight='medium'
                  rightIcon={<ChevronDownIcon />}
                >
                  <Flex alignItems='center'>
                    <Image
                      mr='3'
                      display='inline'
                      src={session.user?.image || ''}
                      borderRadius='sm'
                      boxSize='5'
                    />
                    <span>{session.user?.name}</span>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <Text pl='3' fontSize='xs' color='gray'>
                    {session.user?.email}
                  </Text>
                  <Text pl='3' pt='1' pb='1' fontSize='sm'>
                    Hello, {session.user?.name}.
                  </Text>
                  <MenuDivider />
                  <MenuItem
                    as={Text}
                    fontSize='sm'
                    cursor='pointer'
                    icon={<MinusIcon />}
                    onClick={signOutHandler}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
              :
              <Button
                size='sm'
                variant='solid'
                fontWeight='medium'
                onClick={() => router.push('/signin')}
              >
                Sign in
              </Button>
        }
      </ButtonGroup>

    </Flex>
  );
}
