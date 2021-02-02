import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Stack,
  Button,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: '' as string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      cursor: variables.cursor,
      limit: variables.limit,
    },
  });

  if (!fetching && !data) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  return (
    <Layout>
      <Flex p={4} flexDir='column'>
        <Flex align='center'>
          <Box p='2'>
            <Heading as='h1' fontSize='6xl'>
              My Posts
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              colorScheme='green'
              size='lg'
              onClick={() => {
                router.push('/create-post');
              }}
            >
              Create Post
            </Button>
          </Box>
        </Flex>
        <br />
        {!data && fetching ? (
          <>
            <Text as='h1'>Loading data...</Text>
          </>
        ) : (
          <Stack spacing={8}>
            {data!.posts.map((p) => (
              <Post key={p.id} title={p.title} textSnippet={p.textSnippet} />
            ))}
          </Stack>
        )}
        {data ? (
          <Flex>
            <Button
              m='auto'
              my={8}
              colorScheme='blue'
              size='lg'
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts[data.posts.length - 1].createdAt,
                });
              }}
              isLoading={fetching}
            >
              Load More
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
