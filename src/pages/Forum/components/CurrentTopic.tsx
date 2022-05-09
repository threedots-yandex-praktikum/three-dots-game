import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from '../../../utils/getDateString';
import { mockThemList } from '../Forum';
import { TParams } from '../types';
import { InteractivePanel } from './InteractivePanel';
import { MessageForm } from './MessageForm';
import { generateAvatarLink } from '../../../utils/generateAvatarLink';

// TODO данные ниже брать из store


const mockMessages = [
  {
    messageId: 1,
    avatarLink: undefined,
    userName: 'USER_1_LONG_LONG_LONG_LONG_LONG',
    time: new Date().getTime(),
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  },
  {
    messageId: 2,
    avatarLink: undefined,

    userName: 'USER_2',
    time: new Date().getTime(),
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  },
  {
    messageId: 3,
    avatarLink: undefined,

    userName: 'USER_3',
    time: new Date().getTime(),
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  },
  {
    messageId: 4,
    avatarLink: undefined,

    userName: 'USER_1',
    time: new Date().getTime(),
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  },
  {
    messageId: 5,
    userName: 'USER_5',
    avatarLink: undefined,

    time: new Date().getTime(),
    text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  },
  {
    messageId: 6,
    avatarLink: undefined,

    userName: 'USER_2',
    time: new Date().getTime(),
    text: 'lorem ',
  },
  {
    messageId: 7,
    avatarLink: undefined,

    userName: 'USER_12',
    time: new Date().getTime(),
    text: 'lorem ',
  },
  {
    messageId: 8,
    avatarLink: undefined,

    userName: 'USER_21',
    time: new Date().getTime(),
    text: 'lorem ',
  },
  {
    messageId: 9,
    avatarLink: undefined,

    userName: 'USER_211',
    time: new Date().getTime(),
    text: 'lorem ',
  },
];
const mockData = {
  countMessages: 5,
  title: 'topic title',
};

// const my = {
//   avatarLink: undefined,
// };


export const CurrentTopic = () => {

  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);
  const { avatar } = useAppSelector(state => state.profileReducer)

  const avatarLink = generateAvatarLink(avatar)
  // avatar ?
  //   `https://ya-praktikum.tech/api/v2/resources/${avatar}` :
  //   undefined;

  useEffect(() => {

    const isInThemList = mockThemList.find(i => i.topicId === topicId);
    if (!isInThemList) throw new Error('Темы с таким ID нет');
    // получить контент по id   
    console.log(topicId, 'id');
  }, [params]);

  const currentTopicTitle = useMemo(() => {
    return mockThemList.find(i => i.topicId === topicId)?.title;
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
          {mockData.title}
        </Heading>
        <Divider orientation="horizontal" border="2px" />
        {mockMessages.map(message => {
          const { avatarLink, messageId, text, time, userName } = message;
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
                    bg={avatarLink ? 'transparent' : 'purple.500'}
                    size="lg"
                    src={avatarLink}
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
        <Stack
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
            <MessageForm />
          </Box>
        </Stack>
      </Flex>
    </>

  );
};
