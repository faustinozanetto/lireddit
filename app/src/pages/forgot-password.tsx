import React, { useState } from 'react';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Flex>
              <Box w={500} p={4} my={12} mx='auto'>
                <Form>
                  <Heading as='h2' p={4} textAlign='center'>
                    Forgot Password
                  </Heading>
                  <InputField
                    name='email'
                    placeholder='email'
                    label='Email'
                    type='email'
                  />
                  <Stack justify='center' mt={3} isInline spacing={10}>
                    <Button
                      mr={2}
                      minWidth='45%'
                      colorScheme='teal'
                      isLoading={isSubmitting}
                      type='submit'
                    >
                      Forgot Password
                    </Button>
                  </Stack>
                </Form>
              </Box>
            </Flex>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
