import { GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';


export const InfoSectionTextItem = ({ title, text }: { title: string, text: string }) => {
  const { secondColorText, mainColor, greenColorText } = useAppSelector(state => state.themeReducer)
  return (
    <GridItem
      bg={secondColorText}
      p={6}
      rounded="lg"
      boxShadow="lg"
    >
      <Heading color={mainColor} mb={4}>
        {title}
      </Heading>
      <Text
        fontSize="lg"
        color={greenColorText}
      >
        {text}
      </Text>
    </GridItem>
  )
};
