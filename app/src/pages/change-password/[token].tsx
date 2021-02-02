import React, { useState } from 'react';
import NextLink from 'next/link';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from '../../components/InputField';
import { useRouter } from 'next/router';
import { useChangePasswordMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token:
                typeof router.query.token === 'string'
                  ? router.query.token
                  : '',
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              console.log(errorMap);
              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              // worked
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Flex>
              <Box w={500} p={4} my={12} mx='auto'>
                <Form>
                  <Heading as='h2' p={4} textAlign='center'>
                    Change Password
                  </Heading>
                  <InputField
                    name='newPassword'
                    placeholder='new password'
                    label='New Password'
                    type='password'
                  />
                  {tokenError ? (
                    <Flex>
                      <Box mr={2} bgColor='red'>
                        <Text as='h5' color='red'>
                          {tokenError}
                        </Text>
                      </Box>
                      <NextLink href='/forgot-password'>
                        <Link>click here to get a new one</Link>
                      </NextLink>
                    </Flex>
                  ) : null}
                  <Stack justify='center' mt={3} isInline spacing={10}>
                    <Button
                      minWidth='40%'
                      colorScheme='teal'
                      type='submit'
                      isLoading={isSubmitting}
                    >
                      Change Password
                    </Button>
                  </Stack>
                </Form>
              </Box>
            </Flex>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
