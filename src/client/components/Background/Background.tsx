import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAppSelector } from 'client/hooks/useAppSelector';
import {RootState} from "client/store/reducers/rootReducer";

const bg = '/img/bg.png';
const bgGrayScale = '/img/bgGrayScale.png';

export const Background = (props: { children: React.ReactNode, isGreyScale?: boolean }) => {

  const image = props.isGreyScale ? bgGrayScale : bg;
  const { bgColor } = useAppSelector((state: RootState) => state.themeReducer);

  return (
    <Flex
      bg={bgColor}
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
