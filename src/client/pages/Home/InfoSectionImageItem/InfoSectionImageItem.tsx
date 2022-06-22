import { GridItem } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';


export const InfoSectionImageItem = ({ src }: { src: string }) => {
  const { bgColorThird } = useAppSelector(state => state.themeReducer);
  return (
    <GridItem
      p={6}
      rounded="lg"
      bg={bgColorThird}
      boxShadow="md"
      bgImage={src}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    />
  );
};
