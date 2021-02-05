import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Heading, Stack, Button, Spinner } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import {
  usePostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntID } from '../../../utils/useGetIntID';

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const router = useRouter();
  const intId = useGetIntID();
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <Spinner />
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
    <Layout variant='small'>
      <Formik
        initialValues={{ title: data?.post?.title, text: data?.post?.text }}
        onSubmit={async (values) => {
          //@ts-ignore
          await updatePost({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Form>
                <Heading as='h2' p={4} textAlign='center'>
                  Edit Post
                </Heading>
                <InputField name='title' placeholder='title' label='Title' />
                <InputField
                  textarea
                  name='text'
                  placeholder='text...'
                  label='Text'
                />
                <Stack justify='center' mt={3} isInline spacing={10}>
                  <Button
                    mr={2}
                    minWidth='45%'
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Update Post
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Flex>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
