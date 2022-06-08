import React from 'react';
import { Flex } from '@chakra-ui/react';

const bg = '/img/bg.png';
const bgGrayScale = '/img/bgGrayScale.png';

export const Background = (props: { children: React.ReactNode, isGreyScale?: boolean }) => {

  const image = props.isGreyScale ? bgGrayScale : bg;

  return (
    <Flex
      bg="gray.100"
      bgImage={`url('${image}')`}
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
