import React from 'react';
import NextLink from 'next/link';
import { Flex, Box, Link, Button, Heading } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  // Data is loading
  if (fetching) {
    body = null;
    //User not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link color='white' mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white' mr={2}>
            Register
          </Link>
        </NextLink>
      </>
    );
    // User is logged
  } else {
    body = (
      <Flex>
        <Box mr={2}>Hello {data.me.username}!</Box>
        <Button
          variant='link'
          colorScheme='white'
          isLoading={logoutFetching}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1.5rem'
      bgGradient='linear(to-l, #7928CA, #FF0080)'
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
          Li Reddit
        </Heading>
      </Flex>
    </Flex>

    // <Flex zIndex={1} position='sticky' top={0}>
    //   <Box w='100%' h='75px' bgGradient='linear(to-l, #7928CA, #FF0080)'>
    //     {body}
    //   </Box>
    // </Flex>
  );
};
