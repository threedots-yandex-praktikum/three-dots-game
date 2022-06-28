import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { useHistory } from 'react-router-dom';
import { FORUM_ROUTE } from 'client/constants/routes';
import { Topic } from './Topic';
import { InteractivePanel } from './InteractivePanel';
import { CreateTopic } from './CreateTopic';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { getTopicsAC } from 'client/store/reducers/forumReducer/forumActionCreators';




export const ListOfThems = () => {
  const history = useHistory();
  const { topics } = useAppSelector(state => state.forumReducer);
  const { mainColorText, secondColorText } = useAppSelector(state => state.themeReducer);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseMemoized = useCallback(() => setIsModalOpen(false), []);
  const onOpenMemoized = useCallback(() => setIsModalOpen(true), []);



  useEffect(() => {
    dispatch(getTopicsAC());
  }, [dispatch]);

  return (
    <>
      <InteractivePanel topicName={null} onOpen={onOpenMemoized} />
      <Flex
        boxShadow="dark-lg"
        direction="column"
        m="0"
        w="100%"
        justifyContent="center"
        bg={secondColorText}
        p="10px"
      >
        <Flex justifyContent="start" p="6px">
          <Box w="60%" >
            <Text
              fontSize="larger"
              align="center"
              color={mainColorText}
            >
              Тема
            </Text>
          </Box>
          <Box w="20%">
            <Text
              fontSize="larger"
              color={mainColorText}
            >
              Дата обновления
            </Text>
          </Box>
          <Box w="20%">
            <Text
              fontSize="larger"
              color={mainColorText}
            >
              Последнее сообщение
            </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" border="2px" />
        {topics?.map(topic => {
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
