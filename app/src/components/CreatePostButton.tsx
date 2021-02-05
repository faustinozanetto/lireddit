import React from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';

type CreatePostButtonProps = {}

export const CreatePostButton: React.FC<CreatePostButtonProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [{ data: userData }] = useMeQuery();
  const createPost = async () => {
    if (userData?.me) {
      router.push('/post/create');
    } else {
      toast({
        title: 'An Error Ocurred!',
        description: 'You must be logged in to vote posts!',
        status: 'error',
        isClosable: true,
        duration: 6000,
      });
    }
  };
  return (
    <Box>
      <Button
        colorScheme='green'
        size='lg'
        onClick={() => {
          createPost();
        }}
      >
        Create Post
      </Button>
    </Box>
  );
};
