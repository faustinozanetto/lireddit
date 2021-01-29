import React, { useState } from 'react';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Form, Formik } from 'formik';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from '../../components/InputField';
import { useRouter } from 'next/router';
import { useChangePasswordMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const toast = useToast();
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as any;

  return (
    <>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token,
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              console.log(errorMap);
              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
              onClose();
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
                  <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <AlertDialogHeader>Change Password?</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Are you sure you want to change your password?.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          No
                        </Button>
                        <Button colorScheme='red' ml={3} type='submit'>
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Heading as='h2' p={4} textAlign='center'>
                    Change Password
                  </Heading>
                  <InputField
                    name='newPassword'
                    placeholder='new password'
                    label='New Password'
                    type='password'
                  />
                  <Stack justify='center' mt={3} isInline spacing={10}>
                    <Button minWidth='40%' colorScheme='teal' onClick={onOpen}>
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
