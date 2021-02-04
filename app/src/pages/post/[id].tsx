import React from 'react';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePostQuery } from '../../generated/graphql';
import { Box } from '@chakra-ui/react';
import { Layout } from '../../components/Layout';
import { PostComplete } from '../../components/PostComplete';

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

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

  return (
    <Layout>
      <PostComplete post={data?.post} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
