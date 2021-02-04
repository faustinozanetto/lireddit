import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { PostQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

interface PostProps {
  post: PostQuery['post'];
}

export const PostComplete: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const parseDate = (date: number | string | Date | undefined) => {
    return new Date(date as Date);
  };
  return (
    <>
      <Box p={6} bgColor='white' borderRadius='2xl' boxShadow='2xl'>
        <Flex>
          <Box>
            <HStack>
              <Heading fontSize='5xl'>{post?.title}</Heading>
              <Spacer />
              <Button
                onClick={() => {
                  router.push('/');
                }}
              >
                Go Back
              </Button>
            </HStack>
            <Text fontSize='lg' ml={1}>
              by {post?.creator.username} on
              {parseDate(post?.createdAt).toString()}
            </Text>
            <Text mt={4} fontSize='1xl' justifyContent='center'>
              {post?.text}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
