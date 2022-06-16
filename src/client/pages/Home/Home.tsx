import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Grid,
} from '@chakra-ui/react';
import { GAME_START_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from 'client/constants/routes';
import { TopPanel } from 'client/pages/Home/TopPanel';
import { TitleSection } from 'client/pages/Home/TitleSection';
import { ReviewItem } from 'client/pages/Home/ReviewItem';
import { INFO_SECTION_SCHEMA, MOCKED_REVIEW_DATA } from './constants';
import { InfoSectionImageItem } from 'client/pages/Home/InfoSectionImageItem';
import { InfoSectionTextItem } from 'client/pages/Home/InfoSectionTextItem';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { push } from 'connected-react-router';
import { useAppDispatch } from 'client/hooks/useAppDispatch';


export const Home = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.profileReducer);

  const goToLoginPage = useCallback(
    () => dispatch(push(LOGIN_ROUTE)),
    [dispatch],
  );
  const goToRegisterPage = useCallback(
    () => dispatch(push(REGISTER_ROUTE)),
    [dispatch],
  );
  const goToProfilePage = useCallback(
    () => dispatch(push(PROFILE_ROUTE)),
    [dispatch],
  );
  const goToGameStartPage = useCallback(
    () => {
      return dispatch(push(GAME_START_ROUTE));
    },
    [dispatch],
  );

  return (
    <Container maxW="100%" p="0" bg="gray.200">
      <TopPanel
        isUserAuthenticated={!!id}
        goToLoginPage={goToLoginPage}
        goToProfilePage={goToProfilePage}
        goToRegisterPage={goToRegisterPage}
      />
      <TitleSection goToGameStartPage={goToGameStartPage} />
      <Grid
        margin="5rem 10rem"
        h='1000px'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={16}
      >
        {
          INFO_SECTION_SCHEMA
            .map(({ id, Component, componentProps }) => {
              if (Component === InfoSectionImageItem) {
                return <Component key={id} {...(componentProps as { src: string })} />;
              }

              if (Component === InfoSectionTextItem) {
                return <Component key={id} {...componentProps as { title: string, text: string }} />;
              }
            })
        }
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
