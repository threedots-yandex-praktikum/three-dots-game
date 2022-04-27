import {Box, Button, Flex, Heading, Icon, IconButton} from '@chakra-ui/react';
import { Background } from 'components/Background/Background';
import React, {FC, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import {FORUM_ROUTE, GAME_START_ROUTE, LEADERBOARD_ROUTE, PROFILE_ROUTE} from "../../constants/routes";
import {FaRegUserCircle} from "react-icons/fa";


type GameOverProps = Record<string, unknown>;


export const GameOver: FC<GameOverProps> = () => {
const history = useHistory();

  const goToLeaderBoardPage = useCallback(
    () => history.push(LEADERBOARD_ROUTE),
    [history],
  )
  const goToGameStartPage = useCallback(
    () => history.push(GAME_START_ROUTE),
    [history],
  )
  const goToProfilePage = useCallback(
    () => history.push(PROFILE_ROUTE),
    [history],
  )
  const goToForumPage = useCallback(
    () => history.push(FORUM_ROUTE),
    [history],
  )

  return (
    <Box>
      <Background isGreyScale>
        <IconButton
          pos="absolute"
          top={6}
          right={6}
          aria-label="profile-icon"
          colorScheme="purple"
          mr={4}
          icon={<Icon as={FaRegUserCircle}/>}
          onClick={goToProfilePage}
          boxShadow="dark-lg"
        />
        <div>
          <Heading size="4xl" mb={16}>
            Игра окончена
          </Heading>
          <Flex
            align="center"
            justify="center"
            direction="column"
          >
            <Button
              w={300}
              colorScheme="purple"
              mb={3}
              boxShadow="dark-lg"
              onClick={goToGameStartPage}
            >
              Попробую снова
            </Button>
            <Button
              w={300}
              colorScheme="purple"
              mb={3}
              boxShadow="dark-lg"
              onClick={goToLeaderBoardPage}
            >
              Посмотрю список лидеров
            </Button>
            <Button
              w={300}
              colorScheme="purple"
              boxShadow="dark-lg"
              onClick={goToForumPage}
            >
              Похоливарю на форуме
            </Button>
          </Flex>
        </div>
      </Background>
    </Box>
  )
}
