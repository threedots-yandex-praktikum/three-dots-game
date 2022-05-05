import { GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';


export const InfoSectionTextItem = ({ title, text }: { title: string, text: string }) => (
  <GridItem
    bg="white"
    p={6}
    rounded="lg"
    boxShadow="lg"
  >
    <Heading color="purple.500" mb={4}>
      {title}
    </Heading>
    <Text
      fontSize="lg"
      color="green.300"
    >
      {text}
    </Text>
  </GridItem>
);
