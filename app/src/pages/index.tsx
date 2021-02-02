import React from 'react';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Text, Flex, Link, Heading, Stack, Button } from '@chakra-ui/react';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 100,
      cursor: '',
    },
  });
  return (
    <Layout>
      <Flex p={4} flexDir='column'>
        <Heading as='h1' fontSize='6xl'>
          My Posts
        </Heading>
        <br />
        {!data && fetching ? (
          <div>Loading data...</div>
        ) : (
          <Stack spacing={8}>
            {data!.posts.map((p) => (
              <Post
                key={p.id}
                title={p.title}
                textSnippet={p.text.slice(0, 150)}
              />
            ))}
          </Stack>
        )}
        {data ? (
          <Flex>
            <Button isLoading={fetching} m='auto' my={8}>
              Load More
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
