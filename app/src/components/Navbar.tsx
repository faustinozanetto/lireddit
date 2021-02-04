import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Box,
  Link,
  Button,
  Heading,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  let body = null;

  // Data is loading
  if (fetching) {
    body = null;
    //User not logged in
  } else if (!data?.me) {
    body = (
      <Flex>
        <Box d='flex'>
          <HStack justifyContent='center' alignItems='center'>
            <Button
              colorScheme='teal'
              onClick={() => {
                router.push('/login');
              }}
            >
              Login
            </Button>
            <Spacer />
            <Button
              colorScheme='linkedin'
              onClick={() => {
                router.push('/register');
              }}
            >
              Register
            </Button>
          </HStack>
        </Box>
      </Flex>
    );
    // User is logged
  } else {
    body = (
      <Flex>
        <Box d='flex'>
          <HStack justifyContent='center' alignItems='center'>
            <Heading as='h3' fontSize='lg' color='white' mr={2}>
              {data.me.username}
            </Heading>
            <Button
              colorScheme='blue'
              isLoading={logoutFetching}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </HStack>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={1}
      position='sticky'
      top={0}
      p={4}
      align='center'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
    >
      <Flex flex={1} m='auto' align='center' maxWidth={800}>
        <Box>
          <Heading as='h1' size='2xl' color='white'>
            Li Reddit
          </Heading>
        </Box>
        <Spacer />
        <Box ml='auto'>{body}</Box>
      </Flex>
    </Flex>
  );
};
