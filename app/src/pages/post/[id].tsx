import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Heading } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { PostComplete } from '../../components/PostComplete';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1>{error.message}</h1>
      </Layout>
    );
  }

  if (!data?.post) {
    if (error) {
      return (
        <Layout>
          <Heading>Could not find post!</Heading>
        </Layout>
      );
    }
  }

  return (
    <Layout>
      <PostComplete post={data?.post} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
