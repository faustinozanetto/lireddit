import React from 'react';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Text, Flex, Link, Heading } from '@chakra-ui/react';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <Flex p={4} flexDir='column'>
        <Heading as='h1' fontSize='6xl'>
          My Posts
        </Heading>
        <br />
        {!data ? (
          <div>Loading data...</div>
        ) : (
          data.posts.map((p) => <div key={p.id}>{p.title}</div>)
        )}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
