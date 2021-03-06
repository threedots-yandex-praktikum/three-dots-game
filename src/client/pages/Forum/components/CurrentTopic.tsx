import { Box, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/layout';
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { useAppSelector } from 'client/hooks/useAppSelector';
import React, {useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from 'client/utils/getDateString';
import { TParams } from '../types';
import { InteractivePanel } from './InteractivePanel';
import { MessageForm } from './MessageForm';
import { generateAvatarLink } from 'client/utils/generateAvatarLink';
import {
  deleteMessageAC,
  getCurrentTopicAC,
  sendReactionAC,
} from 'client/store/reducers/forumReducer/forumActionCreators';
import { useAppDispatch } from 'client/hooks/useAppDispatch';
import { getGeolocation } from 'client/utils/getGeolocation';
import _groupBy from 'lodash/groupBy';



const AVAILABLE_REACTION_CODES = [
  {
    reactionCode: 'LAUGHING_WITH_TEARS',
    markup: <span>&#129315;</span>,
  },
  {
    reactionCode: 'CRYING_FACE',
    markup: <span>&#128549;</span>,
  },
  {
    reactionCode: 'SCREAMING_FACE',
    markup: <span>&#128561;</span>,
  },
  {
    reactionCode: 'FIRE',
    markup: <span>&#128293;</span>,
  },
];

export const CurrentTopic = () => {


  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);

  const { avatar, id: currentUserId } = useAppSelector(state => state.profileReducer);
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

  const currentTopicTitle = currentTopic ? currentTopic.title : '?????? ????????????';


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

  const onSendReaction = useCallback(
    (messageId, reactionCode) => dispatch(sendReactionAC(topicId, messageId, reactionCode)),
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
            currentUserId,
            theme,
            onReply,
            onEdit,
            onDelete,
            onSendReaction,
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
  currentUserId,
  theme,
  onReply,
  onEdit,
  onDelete,
  onSendReaction,
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
    userId,
    country,
    town,
    replies,
    commentReactions,
    reactions,
  } = message;

  const preparedReactionsData = commentReactions
    .map(commentReaction => {

      const reaction = reactions.find(({ id }) => commentReaction.reactionId === id);

      return {
        ...commentReaction,
        code: reaction ? reaction.code : null,
      };
    });

  const reactionsByReactionCode = _groupBy(
    preparedReactionsData,
    'code',
  );

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
        <Box flexDirection="column">
          <Box mb={15}>
            <Popover>
              {({ onClose }) => (
                <React.Fragment>
                  <PopoverTrigger>
                    <Button>??????????????</Button>
                  </PopoverTrigger>
                  <PopoverContent w="25px">
                    <Box>
                      {
                        AVAILABLE_REACTION_CODES
                          .map(({ reactionCode, markup }) => (
                            <span style={{ cursor: 'pointer' }}
                                  key={reactionCode}
                                  onClick={() => {
                                    onSendReaction(messageId, reactionCode);
                                    onClose();
                                  }}
                            >
                        {markup}
                      </span>
                          ))
                      }
                    </Box>
                  </PopoverContent>
                </React.Fragment>
              )}
            </Popover>
            <Button onClick={() => onReply(messageId)}>????????????????</Button>
            {
              userId === currentUserId ?
                <React.Fragment>
                  <Button onClick={() => onEdit(message)}>??????????????????????????????</Button>
                  <Button onClick={() => onDelete(messageId)}>??????????????</Button>
                </React.Fragment> :
                null
            }
          </Box>
          <Box display="flex">
            {
              AVAILABLE_REACTION_CODES
                .map(({ reactionCode, markup }) => {

                  const reactionsForCodeAmount = reactionsByReactionCode[reactionCode] ?
                    reactionsByReactionCode[reactionCode].length :
                    0;

                  if(reactionsForCodeAmount === 0) {
                    return null;
                  }

                  return (
                    <Box
                      display="flex"
                      key={reactionCode}
                      w="25px"
                      h="25px"
                      borderRadius="5px"
                      backgroundColor="#eee"
                      mr="5px"
                      cursor="pointer"
                    >
                      {markup}
                      <Text alignSelf="flex-end" fontSize="10px">
                        {reactionsForCodeAmount}
                      </Text>
                    </Box>
                  );
                })
            }
          </Box>
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
            currentUserId,
            theme,
            onReply,
            onEdit,
            onDelete,
            onSendReaction,
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
