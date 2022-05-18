import React, { useCallback, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Grid,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { GAME_START_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from 'constants/routes';
import { UserContext } from 'components/Root/context';
import { TopPanel } from 'pages/Home/TopPanel';
import { TitleSection } from 'pages/Home/TitleSection';
import { ReviewItem } from './ReviewItem/ReviewItem';
import {  MOCKED_REVIEW_DATA } from './constants';



export const Home = () => {
  const history = useHistory();

  const { userData } = useContext(UserContext);

  const goToLoginPage = useCallback(
    () => history.push(LOGIN_ROUTE),
    [history],
  );
  const goToRegisterPage = useCallback(
    () => history.push(REGISTER_ROUTE),
    [history],
  );
  const goToProfilePage = useCallback(
    () => history.push(PROFILE_ROUTE),
    [history],
  );
  const goToGameStartPage = useCallback(
    () => history.push(GAME_START_ROUTE),
    [history],
  );

  return (
    <Container maxW="100%" p="0" bg="gray.200">
      <TopPanel
        isUserAuthenticated={!!userData}
        goToLoginPage={goToLoginPage}
        goToProfilePage={goToProfilePage}
        goToRegisterPage={goToRegisterPage}
      />
      <TitleSection goToGameStartPage={goToGameStartPage}/>
      <Grid
        margin="5rem 10rem"
        h='1000px'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={16}
      >
        {/* {
          INFO_SECTION_SCHEMA
            .map(({ id, Component, componentProps }) => {
              if(Component === InfoSectionImageItem) {
                return <Component key={id} {...(componentProps as { src: string})}/>;
              }

              if(Component === InfoSectionTextItem) {
                return <Component key={id} {...componentProps as { title: string, text: string }}/>;
              }
            })
        } */}
      </Grid>
      <Flex
        bg="gray.400"
        align="center"
        justify="center"
        w="100%"
        py={20}
        px={30}
        boxShadow="inner"
      >
        <Button
          colorScheme="purple"
          size="lg"
          onClick={goToGameStartPage}
        >
          Начать игру !!!
        </Button>
      </Flex>
      <Grid
        margin="5rem 10rem"
        h='1000px'
        templateRows='repeat(7, 1fr)'
        templateColumns='repeat(3, 1fr)'
        gap={16}
      >
        {
          MOCKED_REVIEW_DATA
            .map(({ id, size, author, content, rating }) => (
              <ReviewItem
                key={id}
                size={size}
                author={author}
                content={content}
                rating={rating}
              />
            ))
        }
      </Grid>
      <Flex alignItems="center" py={3} boxShadow="dark-lg">
        <Box p={6}>
          <Heading size='md'>
            <a
              href="https://github.com/threedots-yandex-praktikum/three-dots-game"
              target="blank"
            >
              github
            </a>
          </Heading>
        </Box>
      </Flex>
    </Container>
  );
};
