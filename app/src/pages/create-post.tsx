import React from 'react';
import { Flex, Box, Heading, Stack, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Form>
                <Heading as='h2' p={4} textAlign='center'>
                  Post Creation
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
                    Create Post
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

export default withUrqlClient(createUrqlClient)(CreatePost);
