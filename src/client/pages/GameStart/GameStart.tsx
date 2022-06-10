import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Background } from 'client/components/Background';
import { HowToPlay } from 'client/components/HowToPlay';
import { FORUM_ROUTE, GAME_PLAY_ROUTE, PROFILE_ROUTE } from 'client/constants/routes';
import React, { useCallback, useMemo } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';


export const GameStart = () => {
  const history = useHistory();

  const goToGamePlayPage = useCallback(
    () => history.push(GAME_PLAY_ROUTE),
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonSchema = useMemo(
    () => [
      {
        id: 'start',
        title: 'Старт',
        onClick: goToGamePlayPage,
      },
      {
        id: 'howToPlay',
        title: 'Как играть',
        onClick: onOpen,
      },
      {
        id: 'forum',
        title: 'На форум',
        onClick: goToForumPage,
      },
    ],
    [goToGamePlayPage, onOpen, goToForumPage],
  );

  return (
    <Box>
      <Background>
        <IconButton
          pos="absolute"
          top={6}
          right={6}
          aria-label="profile-icon"
          colorScheme="purple"
          mr={4}
          icon={<Icon as={FaRegUserCircle} />}
          onClick={goToProfilePage}
          boxShadow="dark-lg"
        />
        <div>
          <Heading size="4xl" mb={16}>
            Начать игру
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
                    colorScheme="purple"
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
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Как играть</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HowToPlay/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='purple' mr={3} onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Background>

    </Box>
  );
};

