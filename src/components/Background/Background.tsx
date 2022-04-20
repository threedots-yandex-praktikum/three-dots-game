import React, {FC} from 'react';

// @ts-ignore
import bg from "static/img/bg.png";
import {Flex} from "@chakra-ui/react";


export const Background: FC<{ children: React.ReactNode }> = props => {

  return (
    <Flex
      bg="gray.100"
      bgImage={`url('${bg}')`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      align="center"
      justify="center"
      h="100vh"
    >
      {props.children}
    </Flex>
  )
}
