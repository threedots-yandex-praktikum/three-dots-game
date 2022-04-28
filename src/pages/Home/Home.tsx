import React, {FC, useCallback, useContext} from 'react';
import bg from "static/img/bg.png";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Icon,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import {
  FaQuoteLeft,
  FaRegStar,
  FaRegUserCircle,
} from 'react-icons/fa';
import {useHistory} from "react-router";
import {GAME_START_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE} from "../../constants/routes";
import {Background} from "components/Background/Background";
import {
  THomeProps,
  THomeRenderProps,
} from "./types";
import {UserContext} from "components/Root/context";


export const Home: FC<THomeProps> = () => {
  const history = useHistory();

  const { userData } = useContext(UserContext);

  const goToLoginPage = useCallback(
    () => history.push(LOGIN_ROUTE),
    [history],
  )
  const goToRegisterPage = useCallback(
    () => history.push(REGISTER_ROUTE),
    [history],
  )
  const goToProfilePage = useCallback(
    () => history.push(PROFILE_ROUTE),
    [history],
  )
  const goToGameStartPage = useCallback(
    () => history.push(GAME_START_ROUTE),
    [history],
  )

  const renderProps: THomeRenderProps = {
    isUserAuthenticated: !!userData,
    goToLoginPage,
    goToRegisterPage,
    goToProfilePage,
    goToGameStartPage,
  };

  return (
    <Container maxW="100%" p="0" bg="gray.200">
      {_renderTopPanel(renderProps)}
      {_renderTitleSection(renderProps)}
      {_renderInfoSection(renderProps)}
      {_renderGameStartSection(renderProps)}
      {_renderReviewSection(renderProps)}
      {_renderBottomPanel(renderProps)}
    </Container>
  )
}

const _renderTopPanel = (renderProps: THomeRenderProps) => {
  return (
    <Flex alignItems="center" py={2} boxShadow="dark-lg">
      <Box p={2}>
        <Heading size='lg'>
          Three Dots
        </Heading>
      </Box>
      <Spacer/>
      {
        renderProps.isUserAuthenticated ?
          _renderProfilePageLink(renderProps) :
          _renderAuthenticationLinks(renderProps)
      }
    </Flex>
  );
};

const _renderProfilePageLink = ({ goToProfilePage }: THomeRenderProps) => {
  return (
    <IconButton
      aria-label="profile-icon"
      colorScheme="purple"
      mr={4}
      icon={<Icon as={FaRegUserCircle}/>}
      onClick={goToProfilePage}
    />
  );
};

const _renderAuthenticationLinks = ({ goToLoginPage, goToRegisterPage }: THomeRenderProps) => {
  return (
    <Box>
      <Button
        colorScheme="purple"
        mr={4}
        onClick={goToRegisterPage}
      >
        Регистрация
      </Button>
      <Button
        colorScheme="purple"
        mr={4}
        onClick={goToLoginPage}
      >
        Вход
      </Button>
    </Box>
  )
}

const _renderTitleSection = ({ goToGameStartPage }: THomeRenderProps) => {
  return (
    <Background>
      <Flex align="center" justify="center">
        <div>
          <Flex alignItems="center">
            <Heading size="4xl">
              THREE
            </Heading>
            <Spacer/>
          </Flex>
          <Flex alignItems="center">
            <Spacer/>
            <Heading size="4xl">
              DOTS
            </Heading>
          </Flex>
          <Flex mt={12} justify="center">
            <Button
              size="lg"
              colorScheme="purple"
              onClick={goToGameStartPage}
            >
                Играть
            </Button>
          </Flex>
        </div>
      </Flex>
    </Background>
  );
};


//TODO придумать и описать нормальный текст и вставить скриншоты из реальной игры
const _renderInfoSection = (props: THomeRenderProps) => {
  return (
    <Grid
      margin="5rem 10rem"
      h='1000px'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={16}
    >
      {
        _renderTextGridItem(
          'ЧТО?',
          'Самая интересная игра на планете',
        )
      }
      {
        _renderScreenShotGridItem('')
      }
      {
        _renderScreenShotGridItem('')
      }
      {
        _renderTextGridItem(
          'КАК?',
          'управляй своей точкой и ешь другие',
        )
      }
      {
        _renderTextGridItem(
          'ПОЧЕМУ?',
          'Это очень весело!',
        )
      }
      {
        _renderScreenShotGridItem('')
      }
    </Grid>
  );
};

const _renderTextGridItem = (title: string, text: string) => (
  <GridItem
    bg="white"
    p={6}
    rounded="lg"
    boxShadow="lg"
  >
    <Heading color="purple.500" mb={4}>
      {title}
    </Heading>
    <Text
      fontSize="lg"
      color="green.300"
    >
      {text}
    </Text>
  </GridItem>
);

const _renderScreenShotGridItem = (src: string) => (
  <GridItem
    bg="gray.300"
    p={6}
    rounded="lg"
    boxShadow="md"
    bgImage={`url('${bg}')`}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
  />
);

//TODO придумать или найти смешные отзывы
const _renderReviewSection = (props: THomeRenderProps) => {
  return (
    <Grid
      margin="5rem 10rem"
      h='1000px'
      templateRows='repeat(7, 1fr)'
      templateColumns='repeat(3, 1fr)'
      gap={16}
    >
      {_renderReviewItem(3, 'Текст смешного отзыва среднего размера', 'Пользователь 1', 5)}
      {_renderReviewItem(2, 'Текст смешного отзыва среднего размера', 'Пользователь 1', 2)}
      {_renderReviewItem(3, 'Текст смешного отзыва среднего размера', 'Пользователь 1', 3)}
      {_renderReviewItem(2, 'Текст смешного отзыва маленького размера', 'Пользователь 1', 5)}
      {_renderReviewItem(4, 'Текст смешного отзыва большого размера', 'Пользователь 1', 3)}
      {_renderReviewItem(2, 'Текст смешного отзыва маленького размера', 'Пользователь 1', 5)}
      {_renderReviewItem(3, 'Текст смешного отзыва среднего размера', 'Пользователь 1', 3)}
      {_renderReviewItem(2, 'Текст смешного отзыва маленького размера', 'Пользователь 1', 2)}
    </Grid>
  );
};

const _renderReviewItem = (rowSpan: number, reviewText: string, reviewerName: string, rating = 1) => (
  <GridItem
    bg="blue.300"
    p={8}
    rowSpan={rowSpan}
    rounded="lg"
    boxShadow="md"
  >
    <Text
      fontSize="xl"
      h="90%"
    >
      {reviewText}
    </Text>
    <Flex align="center" w="100%">
      <Icon as={FaQuoteLeft} mr={2}/>
      {reviewerName}
      <Spacer/>
      {_renderReviewRating(rating)}
    </Flex>
  </GridItem>
)

const _renderReviewRating = (rating: number) => (
  <div>
    {
      Array.from((new Array(rating)))
        .map((item, index) => (
          <Icon key={index} as={FaRegStar}/>
        ))
    }
  </div>
);

const _renderGameStartSection = ({ goToGameStartPage }: THomeRenderProps) => {
  return (
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
  );
};


// возможно еще какую-то информацию разместить на нижней панели
const _renderBottomPanel = (props: THomeRenderProps) => {
  return (
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
  );
};
