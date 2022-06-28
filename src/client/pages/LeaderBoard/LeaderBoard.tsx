import React, { useCallback, useEffect } from 'react';
import { Box, Button, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { Background } from 'client/components/Background';
import { chooseSize, getRandomColor } from './constants';
import { getTableAC } from 'client/store/reducers/leaderBoardReducer/leaderBoardActionCreators';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { SpinnerWrapper } from '../../components/Spinner';
import { useHistory } from 'react-router-dom';
import { GAME_START_ROUTE } from '../../constants/routes';


export const LeaderBoard = () => {
  const dispatch = useAppDispatch();

  const { leaders } = useAppSelector(state => state.leaderBoardReducer);
  const { isFetch } = useAppSelector(state => state.fetchReducer);
  const { mainColor, secondColorText, mainColorText } = useAppSelector(state => state.themeReducer);

  useEffect(() => {
    dispatch(getTableAC());
  }, [dispatch]);
  const history = useHistory();

  const goToGameStatrPage = useCallback(
    () => history.push(GAME_START_ROUTE),
    [history],
  );

  return (
    <Background>
      <Container
        centerContent={true}
        maxW="100%"
      >
        <Heading color={mainColorText}>
          Таблица рекордов
        </Heading>
        <Flex
          bg={secondColorText}
          margin={50}
          maxW="500px"
          alignItems="center"
          boxShadow="dark-lg"
          direction='column'
          w="50%"
          pos="relative"
          pb="6px"
        >
          <SpinnerWrapper loading={isFetch}>
            <Flex w="100%" h="40px" px="10px" alignItems="center">
              <Box w="40px">
              </Box>
              <Box flexGrow={1} ml="10px">
                <Text fontSize="lg" fontWeight="bold" color={mainColorText}>Игрок</Text>
              </Box>
              <Box >
                <Text fontSize="lg" fontWeight="bold" color={mainColorText}>Очки</Text>
              </Box>
            </Flex>
            <Divider
              w="90%"
              orientation='horizontal'
              borderBottomColor="black"
              border="2px"
              my="2px"
            />
            {leaders
              .sort((a, b) => b.score - a.score)
              .map((row, index) => {
                const size = chooseSize(index);
                return (
                  <React.Fragment key={row.id}>
                    <Flex w="100%" h="40px" px="10px" alignItems="center">
                      <Flex w="40px" alignItems="center" justifyContent="center">
                        <Box
                          borderRadius="50%"
                          bgColor={getRandomColor()}
                          w={size}
                          h={size}
                        />
                      </Flex>
                      <Box flexGrow={1} ml="10px" color={mainColorText}>
                        {row.userName}
                      </Box>
                      <Box color={mainColorText}>
                        {row.score}
                      </Box>
                    </Flex>
                    {index === leaders.length - 1
                      ? null
                      : <Divider
                        w="90%"
                        orientation='horizontal'
                        borderBottomColor="black"
                        border="2px"
                        my="2px"
                      />}
                  </ React.Fragment>
                );
              })}
          </SpinnerWrapper>

        </Flex>
        <Button
          onClick={goToGameStatrPage}
          // colorScheme="purple"
          color={secondColorText}
          bg={mainColor}
          boxShadow="dark-lg"
        >
          Вернуться к игре
        </Button>
      </Container>
    </Background>
  );
};
