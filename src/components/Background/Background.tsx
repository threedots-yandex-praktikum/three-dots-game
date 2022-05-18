import React from 'react';
import { Flex } from '@chakra-ui/react';


export const Background = (props: { children: React.ReactNode, isGreyScale?: boolean }) => {


  return (
    <Flex
      bg="gray.100"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      align="center"
      justify="center"
      h="100vh"
    >
      {props.children}
    </Flex>
  );
};
