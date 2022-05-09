import React, { useEffect } from 'react';
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { Background } from 'components/Background';
import { chooseSize, getRandomColor } from './constants';
import { useDispatch } from 'react-redux';
import { getTableAC } from '../../store/reducers/leaderBoardReducer/leaderBoardActionCreators';
import { useAppSelector } from '../../hooks/useAppSelector';





export const LeaderBoard = () => {
  const dispatch = useDispatch()

  const { leaders } = useAppSelector(state => state.leaderBoardReducer)

  useEffect(() => {
    dispatch(getTableAC())
  }, []);

  return (
    <Background>
      <Container
        centerContent={true}
        maxW="100%"
      >
        <Heading>
          Таблица рекордов
        </Heading>
        <Flex
          bg="white"
          margin={50}
          maxW="500px"
          alignItems="center"
          boxShadow="dark-lg"
          direction='column'
          w="50%"
        >
          <Flex w="100%" h="40px" px="10px" alignItems="center">
            <Box w="40px">
            </Box>
            <Box flexGrow={1} ml="10px">
              <Text fontSize="lg" fontWeight="bold">Игрок</Text>
            </Box>
            <Box >
              <Text fontSize="lg" fontWeight="bold"> Очки</Text>
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
            //TODO реализовать в utils свою сортировку (по заданию)
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
                    <Box flexGrow={1} ml="10px">
                      {row.userName}
                    </Box>
                    <Box >
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
        </Flex>
      </Container>
    </Background>
  );
};
