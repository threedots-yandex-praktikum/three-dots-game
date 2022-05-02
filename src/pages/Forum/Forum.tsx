import { Container } from '@chakra-ui/react';
import React from 'react';
import './style.scss';
import { FORUM_ROUTE } from 'constants/routes';
import { ListOfThems } from './components/ListOfThems';
import { CurrentTopic } from './components/CurrentTopic';
import { Route, Switch } from 'react-router-dom';

// TODO данные ниже брать из store
export const mockThemList = [
  {
    topicId: 1,
    title: 'TITLE_1',
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User1',
      message: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',

    },
  },
  {
    topicId: 2,
    title: 'TITLE_2',
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User2',
      message: '1',

    },
  },
  {
    topicId: 3,
    title: 'TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3 TITLE_3',
    date: new Date().getTime(),
    lastMessage: null,
  },
  {
    topicId: 4,
    title: 'TITLE_33',
    date: new Date().getTime(),
    lastMessage: {
      userName: 'User33',
      message: 'Lorem Lorem Lorem1231231321231321 Lorem Lorem Lorem Lorem ',

    },
  },
];

export const Forum = () => {

  return (
    <Container
      w="100%"
      bg="gray.200"
      m="0"
      p="10px"
      centerContent
      maxW="full"
      minH="100vh"
    >
      <Switch>
        <Route path={[FORUM_ROUTE, ':topicId'].join('/')}  >
          <CurrentTopic />
        </Route>
        <Route path={FORUM_ROUTE}  >
          <ListOfThems />
        </Route>
      </Switch>
    </Container>
  );
};

