import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { useAppSelector } from 'client/hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from 'client/utils/getDateString';
import { TParams } from '../types';
import { InteractivePanel } from './InteractivePanel';
import { MessageForm } from './MessageForm';
import { generateAvatarLink } from 'client/utils/generateAvatarLink';
import { getCurrentTopicAC } from 'client/store/reducers/forumReducer/forumActionCreators';
import { useAppDispatch } from 'client/hooks/useAppDispatch';
import { getGeolocation } from 'client/utils/getGeolocation';


export const CurrentTopic = () => {


  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);

  const { avatar } = useAppSelector(state => state.profileReducer);
  const { topics, currentTopic } = useAppSelector(state => state.forumReducer);

  const dispatch = useAppDispatch();
  const [loc, setLoc] = useState(['', '']);
  const [userCountry, userTown] = loc;
  useEffect(() => {
    getGeolocation(setLoc);
  }, []);
  const avatarLink = generateAvatarLink(avatar);

  useEffect(() => {
    dispatch(getCurrentTopicAC(topicId));
  }, [topics, topicId, dispatch]);

  const currentTopicTitle = currentTopic ? currentTopic.title : 'нет данных';

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
          const { avatarLink, messageId, text, time, userName, country, town } = message;
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
                  {
                    country && town ? <Text>  {country} , {town}</Text> : null
                  }
                </Box>
                <Box>
                  <Text>{userName}</Text>
                </Box>
                <Box>
                  <Text textAlign="end" fontSize="13px">{getDateString(new Date(time).getTime())}</Text>
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
                  <Text>{userCountry}, {userTown}</Text>
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
