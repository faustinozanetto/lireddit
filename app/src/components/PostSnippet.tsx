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
  toast,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  PostSnippetFragment,
  useMeQuery,
  useVoteMutation,
} from '../generated/graphql';
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';

type PostProps = {
  post: PostSnippetFragment;
};

export const PostSnippet: React.FC<PostProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  const [{ data: userData }] = useMeQuery();
  const toast = useToast();

  const postVote = async (value: number) => {
    if (post.voteStatus === 1) {
      return;
    }
    setLoadingState('updoot-loading');
    if (userData?.me) {
      await vote({
        postId: post.id,
        value,
      });
    } else {
      toast({
        title: 'An Error Ocurred!',
        description: 'You must be logged in to vote posts!',
        status: 'error',
        isClosable: true,
        duration: 6000,
      });
    }
    setLoadingState('not-loading');
  };

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
                  postVote(1);
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
                  postVote(-1);
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
          <Box d='flex'>
            <VStack justifyContent='center' alignItems='center'>
              <DeletePostButton
                id={post?.id}
                creatorId={post?.creator?.id}
                title={post.title}
              />
              <Spacer />
              <EditPostButton id={post?.id} creatorId={post?.creator?.id} />
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
