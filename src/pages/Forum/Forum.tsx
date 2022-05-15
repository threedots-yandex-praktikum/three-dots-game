import { Container } from '@chakra-ui/react';
import React from 'react';
import './style.scss';
import { FORUM_ROUTE } from 'constants/routes';
import { ListOfThems } from './components/ListOfThems';
import { CurrentTopic } from './components/CurrentTopic';
import { Route, Switch } from 'react-router-dom';
import { SpinnerWrapper } from '../../components/Spinner';
import { useAppSelector } from '../../hooks/useAppSelector';


export const Forum = () => {
  const { isFetch } = useAppSelector(state => state.fetchReducer)

  return (
    <Container
      w="100%"
      bg="gray.200"
      m="0"
      p="10px"
      centerContent
      maxW="full"
      minH="100vh"
      position="relative"
    >
      <Switch>
        <Route path={[FORUM_ROUTE, ':topicId'].join('/')}  >
          <SpinnerWrapper loading={isFetch}>
            <CurrentTopic />
          </SpinnerWrapper>
        </Route>
        <Route path={FORUM_ROUTE}  >
          <SpinnerWrapper loading={isFetch}>
            <ListOfThems />
          </SpinnerWrapper>
        </Route>
      </Switch>
    </Container>
  );
};

