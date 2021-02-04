import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import {
  PostSnippetFragment,
  useDeletePostMutation,
} from '../generated/graphql';

interface DeletePostProps {
  post: PostSnippetFragment;
}

export const DeletePostButton: React.FC<DeletePostProps> = ({ post }) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <>
      <Box>
        <IconButton
          icon={<DeleteIcon />}
          aria-label='Delete Post'
          colorScheme='red'
          onClick={() => {
            deletePost({ id: post?.id });
          }}
        ></IconButton>
      </Box>
    </>
  );
};
