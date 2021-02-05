import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import { DeletePostDialog } from './DeletePostDialog';

type DeletePostProps = {
  id: number;
  creatorId: number;
  title: string;
};

export const DeletePostButton: React.FC<DeletePostProps> = ({
  id,
  creatorId,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, deletePost] = useDeletePostMutation();
  const [{ data }] = useMeQuery();

  if (data?.me?.id !== creatorId || data?.me?.id === undefined) {
    return null;
  }

  return (
    <>
      <Box>
        <IconButton
          icon={<DeleteIcon />}
          aria-label='Delete Post'
          colorScheme='red'
          onClick={() => {
            //@ts-ignore
            onOpen();
          }}
        />
        <DeletePostDialog
          isOpen={isOpen}
          onClose={onClose}
          postName={title}
          onYes={() => {
            deletePost({ id });
          }}
        />
      </Box>
    </>
  );
};
