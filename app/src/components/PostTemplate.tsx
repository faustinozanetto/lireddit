import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface PostProps {
  post: PostSnippetFragment;
}

export const PostTemplate: React.FC<PostProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <>
      <Box p={5} rounded='md' bgColor='white' boxShadow='2xl'>
        <Flex>
          <Box mr={4}>
            <Heading fontSize='xl'>{post.title}</Heading>
            <Text fontSize='md' ml={1}>
              by {post.creator.username}
            </Text>
            <Text mt={4}>{post.textSnippet}</Text>
          </Box>
          <Spacer />
          <Box d='flex' alignItems='center'>
            <Stack verticalAlign='center'>
              <Heading fontSize='md' textAlign='center' mb={1}>
                {post.points} Points
              </Heading>
              <Button
                rightIcon={<ChevronUpIcon />}
                colorScheme='green'
                isLoading={loadingState === 'updoot-loading'}
                onClick={async () => {
                  setLoadingState('updoot-loading');
                  await vote({
                    postId: post.id,
                    value: 1,
                  });
                  setLoadingState('not-loading');
                }}
              >
                Up vote
              </Button>
              <Button
                rightIcon={<ChevronDownIcon />}
                colorScheme='red'
                isLoading={loadingState === 'downdoot-loading'}
                onClick={async () => {
                  setLoadingState('downdoot-loading');
                  await vote({
                    postId: post.id,
                    value: -1,
                  });
                  setLoadingState('not-loading');
                }}
              >
                Down vote
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
