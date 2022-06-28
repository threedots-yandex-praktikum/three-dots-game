import { Box, Button, Flex, Heading, Icon, IconButton } from '@chakra-ui/react';
import { Background } from 'client/components/Background';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { FORUM_ROUTE, GAME_START_ROUTE, LEADERBOARD_ROUTE, PROFILE_ROUTE } from 'client/constants/routes';
import { FaRegUserCircle } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/useAppSelector';


export const GameOver = () => {
  const history = useHistory();

  const goToLeaderBoardPage = useCallback(
    () => history.push(LEADERBOARD_ROUTE),
    [history],
  );
  const goToGameStartPage = useCallback(
    () => history.push(GAME_START_ROUTE),
    [history],
  );
  const goToProfilePage = useCallback(
    () => history.push(PROFILE_ROUTE),
    [history],
  );
  const goToForumPage = useCallback(
    () => history.push(FORUM_ROUTE),
    [history],
  );
  const { mainColor, secondColorText, mainColorText } = useAppSelector(state => state.themeReducer);

  const buttonSchema = useMemo(
    () => [
      {
        id: 'tryAgain',
        title: 'Попробую снова',
        onClick: goToGameStartPage,
      },
      {
        id: 'leaderboard',
        title: 'Посмотрю список лидеров',
        onClick: goToLeaderBoardPage,
      },
      {
        id: 'forum',
        title: 'Похоливарю на форуме',
        onClick: goToForumPage,
      },
    ],
    [goToGameStartPage, goToLeaderBoardPage, goToForumPage],
  );

  return (
    <Box>
      <Background isGreyScale>
        <IconButton
          pos="absolute"
          top={6}
          right={6}
          aria-label="profile-icon"
          bg={mainColor}
          color={secondColorText}
          mr={4}
          icon={<Icon as={FaRegUserCircle} />}
          onClick={goToProfilePage}
          boxShadow="dark-lg"
        />
        <div>
          <Heading size="4xl" mb={16} color={mainColorText}>
            Игра окончена
          </Heading>
          <Flex
            align="center"
            justify="center"
            direction="column"
          >
            {
              buttonSchema
                .map(({ id, title, onClick }) => (
                  <Button
                    key={id}
                    w={300}
                    bg={mainColor}
                    color={secondColorText}
                    mb={3}
                    boxShadow="dark-lg"
                    onClick={onClick}
                  >
                    {title}
                  </Button>
                ))
            }
          </Flex>
        </div>
      </Background>
    </Box>
  );
};
