import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Stack, Heading } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors({
              username: 'An error occurred!',
            });
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

export default Register;
