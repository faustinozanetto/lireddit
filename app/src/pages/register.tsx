import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Stack, Heading, useToast } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  const toast = useToast();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Form>
                <Heading as='h2' p={4} textAlign='center'>
                  Register Account
                </Heading>
                <InputField
                  name='username'
                  placeholder='username'
                  label='Username'
                />
                <InputField name='email' placeholder='email' label='Email' />
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
                <Stack justify='center' mt={3} isInline spacing={10}>
                  <Button
                    minWidth='40%'
                    colorScheme='teal'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Register
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

export default withUrqlClient(createUrqlClient)(Register);
