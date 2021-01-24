import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  // const [register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {}}
      >
        {({ isSubmitting }) => (
          <Flex>
            <Box w={500} p={4} my={12} mx='auto'>
              <Heading as='h2' p={4} textAlign='center'>
                Register Account
              </Heading>
              <FormControl isRequired p={2}>
                <InputField
                  name='username'
                  placeholder='username'
                  label='Username'
                />
              </FormControl>
              <FormControl isRequired p={2}>
                <InputField name='email' placeholder='email' label='Email' />
              </FormControl>
              <FormControl isRequired p={2}>
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
              </FormControl>
              <Stack justify='center' mt={3} isInline spacing={10}>
                <Button
                  minWidth='40%'
                  variantColor='teal'
                  isLoading={isSubmitting}
                  type='submit'
                >
                  Register
                </Button>
              </Stack>
            </Box>
          </Flex>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
