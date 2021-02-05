import React from 'react';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { InputField } from '../../components/InputField';
import { useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
            toast({
              title: 'An error occurred',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              // worked
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Form>
                <Heading as='h2' p={4} textAlign='center'>
                  Login
                </Heading>
                <InputField
                  name='usernameOrEmail'
                  placeholder='username or email'
                  label='Username or Email'
                />
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
                <Stack justify='center' mt={3} isInline spacing={10}>
                  <Button
                    ml={2}
                    minWidth='45%'
                    onClick={() => {
                      router.push('/forgot-password');
                    }}
                  >
                    Forgot Password?
                  </Button>
                  <Button
                    mr={2}
                    minWidth='45%'
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            </Box>
          </Flex>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
