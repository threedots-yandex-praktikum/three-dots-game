import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { getDateString } from 'client/utils/getDateString';
import { TTopicProps } from '../types';
import { useAppSelector } from '../../../hooks/useAppSelector';


export const Topic = ({ topic }: TTopicProps) => {

  const lastMessageString = useMemo(() => {
    const slicedMessage = topic.lastMessage?.message.slice(0, 20) + '...';
    return slicedMessage + ' от ' + topic.lastMessage?.userName;
  }, [topic]);
  const { mainColorText } = useAppSelector(state => state.themeReducer);

  const { date, title, lastMessage } = topic;
  return (
    <Flex borderRadius="7px" justifyContent="start" className="them">
      <Box w="60%" px="4px">
        <Text color={mainColorText}>{title}</Text>
      </Box>
      <Box w="20%">
        <Text color={mainColorText}>{getDateString(date)}</Text>
      </Box >
      <Box w="20%">
        <Text color={mainColorText}>{lastMessage && lastMessageString}</Text>
      </Box>
    </Flex>
  );
};
