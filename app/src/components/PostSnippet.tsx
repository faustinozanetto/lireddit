import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';
import { DeletePostButton } from './DeletePostButton';

interface PostProps {
  post: PostSnippetFragment;
}

export const PostSnippet: React.FC<PostProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <>
      <Box p={5} rounded='md' bgColor='white' boxShadow='2xl'>
        <Flex>
          <Box d='flex'>
            <Stack justifyContent='center' alignItems='center'>
              <IconButton
                icon={<ChevronUpIcon />}
                aria-label='Updoot'
                colorScheme='green'
                isLoading={loadingState === 'updoot-loading'}
                isDisabled={post.voteStatus === 1}
                onClick={async () => {
                  if (post.voteStatus === 1) {
                    return;
                  }
                  setLoadingState('updoot-loading');
                  await vote({
                    postId: post.id,
                    value: 1,
                  });
                  setLoadingState('not-loading');
                }}
              />
              <Heading fontSize='md' textAlign='center' mb={1}>
                {post.points}
              </Heading>
              <IconButton
                icon={<ChevronDownIcon />}
                aria-label='Downdoot'
                colorScheme='red'
                isLoading={loadingState === 'downdoot-loading'}
                isDisabled={post.voteStatus === -1}
                onClick={async () => {
                  if (post.voteStatus === -1) {
                    return;
                  }
                  setLoadingState('downdoot-loading');
                  await vote({
                    postId: post.id,
                    value: -1,
                  });
                  setLoadingState('not-loading');
                }}
              />
            </Stack>
          </Box>
          <Spacer />
          <Box ml={4}>
            <NextLink href='/post/[id]' as={`/post/${post.id}`}>
              <Link>
                <Heading fontSize='xl'>{post.title}</Heading>
              </Link>
            </NextLink>
            <Text fontSize='md' ml={1}>
              by {post.creator.username}
            </Text>
            <Text mt={4}>{post.textSnippet}</Text>
          </Box>
          <Spacer />
          <Box>
            <DeletePostButton post={post} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
