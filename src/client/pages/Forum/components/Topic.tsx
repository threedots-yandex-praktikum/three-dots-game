import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { getDateString } from 'client/utils/getDateString';
import { TTopicProps } from '../types';


export const Topic = ({ topic }: TTopicProps) => {

  const lastMessageString = useMemo(() => {
    const slicedMessage = topic.lastMessage?.message.slice(0, 20) + '...';
    return slicedMessage + ' от ' + topic.lastMessage?.userName;
  }, [topic]);

  const { date, title, lastMessage } = topic;
  return (
    <Flex borderRadius="7px" justifyContent="start" className="them" >
      <Box w="60%" px="4px">
        <Text >{title}</Text>
      </Box>
      <Box w="20%">
        <Text>{getDateString(new Date(date).getTime())}</Text>
      </Box >
      <Box w="20%">
        <Text>{lastMessage && lastMessageString}</Text>
      </Box>
    </Flex>
  );
};
