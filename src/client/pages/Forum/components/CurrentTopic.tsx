import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/layout';
import { Avatar, Button } from '@chakra-ui/react';
import { useAppSelector } from 'client/hooks/useAppSelector';
import React, {useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from 'client/utils/getDateString';
import { TParams } from '../types';
import { InteractivePanel } from './InteractivePanel';
import { MessageForm } from './MessageForm';
import { generateAvatarLink } from 'client/utils/generateAvatarLink';
import {deleteMessageAC, getCurrentTopicAC} from 'client/store/reducers/forumReducer/forumActionCreators';
import { useAppDispatch } from 'client/hooks/useAppDispatch';
import { getGeolocation } from 'client/utils/getGeolocation';


export const CurrentTopic = () => {


  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);

  const { avatar, login } = useAppSelector(state => state.profileReducer);
  const { topics, currentTopic } = useAppSelector(state => state.forumReducer);
  const theme = useAppSelector(state => state.themeReducer);

  const { secondColorText, bgColorSecond, mainColorText, mainColor,
  } = theme;

  const [commentIdToReply, setCommentIdToReply] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);

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


  const onReply = useCallback(
    messageId => setCommentIdToReply(messageId),
    [setCommentIdToReply],
  );

  const onEdit = useCallback(
    message => setCommentToEdit(message),
    [setCommentToEdit],
  );

  const onDelete = useCallback(
    messageId => dispatch(deleteMessageAC(messageId, topicId)),
    [topicId, dispatch],
  );

  const clearReply = useCallback(
    () => {
      setCommentIdToReply(null);
      setCommentToEdit(null);
    },
    [setCommentIdToReply, setCommentToEdit],
  );


  return (
    <>
      <InteractivePanel topicName={currentTopicTitle} />
      <Flex
        boxShadow="dark-lg"
        direction="column"
        m="0"
        w="100%"
        justifyContent="center"
        bg={secondColorText}
        p="10px"
      >
        <Heading textAlign="center" p="6px" color={mainColorText}>
          {currentTopicTitle}
        </Heading>
        <Divider orientation="horizontal" border="2px" />
        {
          currentTopic?.messages
          .map(message => _renderMessage({
            message,
            login,
            theme,
            onReply,
            onEdit,
            onDelete,
            clearReply,
            topicId,
            commentIdToReply,
            commentToEdit,
            initialPadding: 0,
          }))
        }
        {
          currentTopic?.isDisabled
            ? null
            : <Stack
              divider={<StackDivider borderColor={bgColorSecond} />}
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
                    bg={avatarLink ? 'transparent' : mainColor}
                    size="lg"
                    src={avatarLink}
                  />
                  <Text color={mainColorText}>{userCountry}, {userTown}</Text>
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



const _renderMessage = ({
  message,
  login,
  theme,
  onReply,
  onEdit,
  onDelete,
  clearReply,
  topicId,
  commentIdToReply,
  commentToEdit,
  initialPadding,
}) =>  {
  const {
    avatarLink,
    messageId,
    text,
    time,
    userName,
    country,
    town,
    replies,
  } = message;

  const { secondColorText, bgColorSecond, mainColorText, mainColor,
  } = theme;

  const avatar = generateAvatarLink(avatarLink);

  const padding = initialPadding + 10;

  return (
    <Box key={messageId} pl={padding}>
      <Stack
        divider={<StackDivider borderColor={bgColorSecond} />}
        direction="row"
        className="message"
      >
        <Stack
          direction="column"
          w="240px"
        >
          <Box>
            <Avatar
              bg={avatar ? 'transparent' : mainColor}
              size="lg"
              src={avatar}
              color={secondColorText}
            />
            {
              country && town ? <Text color={mainColorText} >  {country} , {town}</Text> : null
            }
          </Box>
          <Box>
            <Text color={mainColorText}>{userName}</Text>
          </Box>
          <Box>
            <Text color={mainColorText} textAlign="end" fontSize="13px">{getDateString(new Date(time).getTime())}</Text>
          </Box>
        </Stack>
        <Box
          flexGrow={1}
          maxW="70%"
          color={mainColorText}
        >
          {text}
        </Box>
        <Box>
          <Button onClick={() => onReply(messageId)}>Ответить</Button>
          {
            userName === login ?
              <React.Fragment>
                <Button onClick={() => onEdit(message)}>Отредактировать</Button>
                <Button onClick={() => onDelete(messageId)}>Удалить</Button>
              </React.Fragment> :
              null
          }
        </Box>
      </Stack>
      {
        commentIdToReply === messageId ?
          <Box pl={40}>
            <MessageForm
              topicId={topicId}
              parentId={commentIdToReply}
              closeReplyForm={clearReply}
              canBeClosed
            />
          </Box> :
          null
      }
      {
        !!commentToEdit && commentToEdit.messageId === messageId ?
          <Box pl={40}>
            <MessageForm
              topicId={topicId}
              parentId={commentToEdit.parentId}
              commentId={commentToEdit.messageId}
              value={commentToEdit.text}
              closeReplyForm={clearReply}
              canBeClosed
            />
          </Box> :
          null
      }
      <div className="replies">
        {
          replies.map(data => _renderMessage({
            message: data,
            login,
            theme,
            onReply,
            onEdit,
            onDelete,
            clearReply,
            topicId,
            commentIdToReply,
            commentToEdit,
            initialPadding: padding,
          }))
        }
      </div>
    </Box>
  );
}
