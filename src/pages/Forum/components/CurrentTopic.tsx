import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from 'utils/getDateString';
import { TParams } from '../types';
import { InteractivePanel } from './InteractivePanel';
import { MessageForm } from './MessageForm';
import { generateAvatarLink } from 'utils/generateAvatarLink';
import { getCurrentTopicAC } from 'store/reducers/forumReducer/forumActionCreators';
import { useAppDispatch } from 'hooks/useAppDispatch';


export const CurrentTopic = () => {

  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);

  const { avatar } = useAppSelector(state => state.profileReducer);
  const { topics, currentTopic } = useAppSelector(state => state.forumReducer);

  const dispatch = useAppDispatch();

  const avatarLink = generateAvatarLink(avatar);

  useEffect(() => {
    const isInThemList = topics?.find(i => i.topicId === topicId);
    if (!isInThemList) throw new Error('Темы с таким ID нет');

    dispatch(getCurrentTopicAC(topicId));
  }, [topics, topicId, dispatch]);

  const currentTopicTitle = useMemo(() => {
    return topics?.find(i => i.topicId === topicId)?.title;
  }, [topicId]);

  return (
    <>
      <InteractivePanel topicName={currentTopicTitle} />
      <Flex
        boxShadow="dark-lg"
        direction="column"
        m="0"
        w="100%"
        justifyContent="center"
        bg="#ffffff"
        p="10px"
      >
        <Heading textAlign="center" p="6px">
          {currentTopicTitle}
        </Heading>
        <Divider orientation="horizontal" border="2px" />
        {currentTopic?.messages.map(message => {
          const { avatarLink, messageId, text, time, userName } = message;
          const avatar = generateAvatarLink(avatarLink);
          return (
            <Stack
              divider={<StackDivider borderColor='gray.200' />}
              direction="row"
              className="message"
              key={messageId}
            >
              <Stack
                direction="column"
                w="240px"
              >
                <Box>
                  <Avatar
                    bg={avatar ? 'transparent' : 'purple.500'}
                    size="lg"
                    src={avatar}
                  />
                </Box>
                <Box>
                  <Text>{userName}</Text>
                </Box>
                <Box>
                  <Text textAlign="end" fontSize="13px">{getDateString(time)}</Text>
                </Box>
              </Stack>
              <Box
                flexGrow={1}
                maxW="70%"
              >
                {text}
              </Box>
            </Stack>
          );
        })}
        {
          currentTopic?.isDisabled
            ? null
            : <Stack
              divider={<StackDivider borderColor='gray.200' />}
              direction="row"
              className="message"
              height="168px"
            >
              <Stack
                direction="column"
                w="240px"
              >
                <Box>
                  <Avatar
                    bg={avatarLink ? 'transparent' : 'purple.500'}
                    size="lg"
                    src={avatarLink}
                  />
                </Box>

              </Stack>
              <Box
                flexGrow={1}
                maxW="70%"
              >
                <MessageForm topicId={topicId} />
              </Box>
            </Stack>
        }
      </Flex>
    </>

  );
};
