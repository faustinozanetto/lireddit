import React from 'react';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

interface PostProps {
  title: string;
  author: string;
  textSnippet: string;
}

export const Post: React.FC<PostProps> = ({ title, author, textSnippet }) => {
  return (
    <>
      <Box p={5} rounded='md' bgColor='white' boxShadow='2xl'>
        <Flex>
          <Box>
            <Heading fontSize='xl'>{title}</Heading>
            <Text fontSize='md' ml={1}>
              by {author}
            </Text>
          </Box>
        </Flex>
        <Text mt={4}>{textSnippet}</Text>
      </Box>
    </>
  );
};
