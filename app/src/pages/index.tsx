import { NavBar } from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Text, Flex } from '@chakra-ui/react';
import { usePostsQuery } from '../generated/graphql';
import React from 'react';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <Flex p={4} flexDir='column'>
        <Text fontSize='3xl'>My Posts</Text>
        <br />
        {!data ? (
          <div>Loading data...</div>
        ) : (
          data.posts.map((p) => <div key={p.id}>{p.title}</div>)
        )}
      </Flex>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
