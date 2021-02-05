import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Stack,
  Button,
  Spacer,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { PostSnippet } from '../components/PostSnippet';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { CreatePostButton } from '../components/CreatePostButton';

const Index = () => {
  const router = useRouter();
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <Layout>
        <Heading as='h2' fontSize='1xl'>
          Error
        </Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex p={4} flexDir='column'>
        <Flex align='center'>
          <Box p='2'>
            <Heading as='h1' fontSize='6xl'>
              Posts
            </Heading>
          </Box>
          <Spacer />
          <CreatePostButton />
        </Flex>
        <Flex p={4}>
          {!data && fetching ? (
            <Box>
              <Spinner />
            </Box>
          ) : (
            <Stack spacing={8}>
              {data!.posts.posts.map((p) =>
                !p ? null : (
                  <>
                    <PostSnippet key={p.id} post={p} />
                  </>
                )
              )}
            </Stack>
          )}
        </Flex>
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              m='auto'
              my={8}
              colorScheme='blue'
              size='lg'
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
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
