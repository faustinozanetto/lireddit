import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface PostProps {
  title: string;
  textSnippet: string;
}

export const Post: React.FC<PostProps> = ({ title, textSnippet }) => {
  return (
    <>
      <Box p={5} rounded='md' bgColor='white' boxShadow='2xl'>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{textSnippet}</Text>
      </Box>
    </>
  );
};
