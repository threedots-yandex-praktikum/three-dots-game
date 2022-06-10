import { GridItem } from '@chakra-ui/react';
import React from 'react';


export const InfoSectionImageItem = ({ src }: { src: string }) => (
  <GridItem
    p={6}
    rounded="lg"
    bg="gray.300"
    boxShadow="md"
    bgImage={src}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
  />
);
