import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';

type EditPostButtonProps = {
  id: number ;
  creatorId: number ;
};

export const EditPostButton: React.FC<EditPostButtonProps> = ({
  id,
  creatorId,
}) => {
  const router = useRouter();
  const [{ data }] = useMeQuery();

  if (data?.me?.id !== creatorId || data?.me?.id === undefined) {
    return null;
  }

  return (
    <>
      <Box>
        <IconButton
          icon={<EditIcon />}
          aria-label='Edit Post'
          colorScheme='messenger'
          onClick={() => {
            router.push(`/post/edit/${id}`);
          }}
        />
      </Box>
    </>
  );
};
