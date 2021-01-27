import { Flex, Box, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
        <Button variant='link' colorScheme='white'>
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg='tan' p={4}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  );
};
