import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { getDateString } from '../../../utils/getDateString';
import { TTopicProps, TLastMessage } from '../types';


export const Topic = ({ topic }: TTopicProps) => {

  const { date, title, lastMessage } = topic
  return (
    <Flex borderRadius="7px" justifyContent="start" className="them" >
      <Box w="60%" px="4px">
        <Text >{title}</Text>
      </Box>
      <Box w="20%">
        <Text>{getDateString(date)}</Text>
      </Box >
      {_renderLastMessage(lastMessage)}
    </Flex>
  );
};


const _renderLastMessage = (message: TLastMessage) => {
  const _getLastMessageString = (message: TLastMessage): string => {
    const slicedMessage = message?.message.slice(0, 20) + '...';
    return slicedMessage + ' от ' + message?.userName;
  };

  return (
    <Box w="20%">
      <Text>{message && _getLastMessageString(message)}</Text>
    </Box>
  );

};
