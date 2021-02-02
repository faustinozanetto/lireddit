import React from 'react';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import {
  Flex,
  Heading,
  Stack,
  Button,
  Spacer,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const toast = useToast();
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
      cursor: '',
    },
  });

  if (!fetching && !data) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
    // toast({
    //   title: 'An Error Occurred!',
    //   description: 'There has been an error while fetching the data',
    //   duration: 9000,
    //   isClosable: true,
    //   status: 'error',
    // });
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
              isLoading={fetching}
              m='auto'
              my={8}
              colorScheme='blue'
              size='lg'
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
