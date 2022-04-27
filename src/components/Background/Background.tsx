import React, { FC } from 'react';

import bg from 'static/img/bg.png';
import bgGrayScale from 'static/img/bgGrayScale.png';
import { Flex } from '@chakra-ui/react';


export const Background: FC<{ children: React.ReactNode, isGreyScale?: boolean }> = props => {

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
