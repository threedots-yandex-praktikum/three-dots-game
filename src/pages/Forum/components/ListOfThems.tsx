import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { useHistory } from 'react-router-dom';
import { FORUM_ROUTE } from 'constants/routes';
import { Topic } from './Topic';
import { mockThemList } from '../Forum';
import { InteractivePanel } from './InteractivePanel';
import { CreateTopic } from './CreateTopic';




export const ListOfThems = () => {
  const topics = mockThemList; // из useEffect
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseMemoized = useCallback(() => setIsModalOpen(false), []);
  const onOpenMemoized = useCallback(() => setIsModalOpen(true), []);

  useEffect(() => {
    //получение тем (const topics =...)
  });

  return (
    <>

      <InteractivePanel topicName={null} onOpen={onOpenMemoized} />

      <Flex
        boxShadow="dark-lg"
        direction="column"
        m="0"
        w="100%"
        justifyContent="center"
        bg="#ffffff"
        p="10px"
      >
        <Flex justifyContent="start" p="6px">
          <Box w="60%" >
            <Text fontSize="larger" align="center">Тема</Text>
          </Box>
          <Box w="20%">
            <Text fontSize="larger">Дата обновления</Text>
          </Box>
          <Box w="20%">
            <Text fontSize="larger">Последнее сообщение </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" border="2px" />
        {topics.map(topic => {
          const { topicId } = topic;
          return (
            <div
              key={topicId}
              onClick={() => {
                history.push([FORUM_ROUTE, topicId].join('/'));
              }}
            >
              <Topic topic={topic} />
            </div>
          );
        })}
      </Flex>
      <CreateTopic
        isOpen={isModalOpen}
        onClose={onCloseMemoized}
      />
    </>
  );
};
