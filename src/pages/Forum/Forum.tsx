import { Container } from '@chakra-ui/react';
import React from 'react';
import './style.scss';
import { FORUM_ROUTE } from 'constants/routes';
import { ListOfThems } from './components/ListOfThems';
import { CurrentTopic } from './components/CurrentTopic';
import { Route, Switch } from 'react-router-dom';


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

