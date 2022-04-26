import React, { FC, useEffect, } from 'react';
import './style.scss';
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { LeaderBoardProps } from './types';
import { Background } from 'components/Background/Background';
import { chooseSize, getRandomColor } from './constants';


const mockData = [
  { id: 1, userName: 'user1', score: 20 },
  { id: 2, userName: 'user2', score: 20 },
  { id: 3, userName: 'user3', score: 20 },
  { id: 4, userName: 'user4', score: 40 },
  { id: 5, userName: 'user5', score: 50 },
  { id: 6, userName: 'user6', score: 10 },
  { id: 7, userName: 'userwerwerwerwer 2342432342342342347', score: 3 },

]


export const LeaderBoard: FC<LeaderBoardProps> = () => {

  useEffect(() => {
    // лоадер ON
    // запрос данных
    // лоадер OFF
  })

  return (
    <Background>
      <Container
        centerContent={true}
        maxW="100%"
      >
        {_renderTitle()}
        {_renderList()}
      </Container>
    </Background>
  )
}



const _renderHead = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>

  )
}

const _renderList = () => {
  return (
    <Flex
      bg="white"
      margin={50}
      maxW="500px"
      alignItems="center"
      boxShadow="dark-lg"
      direction='column'
      w="50%"
    >
      {_renderHead()}
      {mockData
        //TODO реализовать в utils свою сортировку (по заданию)
        .sort((a, b) => b.score - a.score)
        .map((row, index) => {
          const size = chooseSize(index)
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
              {index === mockData.length - 1
                ? null
                : <Divider
                  w="90%"
                  orientation='horizontal'
                  borderBottomColor="black"
                  border="2px"
                  my="2px"
                />}
            </ React.Fragment>
          )
        })}
    </Flex>
  );
};

const _renderTitle = () => {
  return (
    <Heading>
      Таблица рекордов
    </Heading>)

}
