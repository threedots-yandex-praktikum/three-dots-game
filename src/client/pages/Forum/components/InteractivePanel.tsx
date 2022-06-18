import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FORUM_ROUTE } from 'client/constants/routes';
import { useAppSelector } from 'client/hooks/useAppSelector';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { closeTopicAC } from 'client/store/reducers/forumReducer/forumActionCreators';
import { TInteractivePanelProps, TParams } from '../types';



export const InteractivePanel = ({ topicName, onOpen }: TInteractivePanelProps) => {

  const dispatch = useDispatch();

  const params = useParams<TParams>();
  const topicId = parseInt(params.topicId);

  const makeTopicDisabled = () => {
    dispatch(closeTopicAC(topicId));
  };

  const { id } = useAppSelector(state => state.profileReducer);
  const { currentTopic } = useAppSelector(state => state.forumReducer);
  const { mainColorText, secondColorText, mainColor } = useAppSelector(state => state.themeReducer);

  return (
    <Flex p="10px" my="15px" boxShadow="dark-lg" bg={secondColorText} w="100%">
      <Box flexGrow={1}>
        <Text as="span" color={mainColorText}>
          <span>{' > '} </span>
          <Link className="nav-link" to={FORUM_ROUTE} color={mainColorText}>
            Форум
          </Link>
        </Text>
        {topicName &&
          <Text display="inline" color={mainColorText}>
            {' > '}{topicName}
          </Text>
        }
      </Box>
      <Box w="25%" ml="5px">
        {topicName
          ? <Button
            bg='#E53E3E'
            color={secondColorText}
            onClick={makeTopicDisabled}
            disabled={currentTopic?.userOwenerId !== id}
          >
            Закрыть тему &times;
          </Button>
          : <Button
            onClick={onOpen}
            colorScheme="purple"
            bg={mainColor}
            color={secondColorText}
          >
            Создать тему +
          </Button>
        }
      </Box>
    </Flex>
  );
};
