import { Box, Button, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Background } from 'components/Background/Background';
import HowToPlay from 'components/HowToPlay/HowToPlay';
import { FORUM_ROUTE, GAME_PLAY_ROUTE, PROFILE_ROUTE } from 'constants/routes';
import React, { FC, useCallback } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './style.scss';


type GameStartProps = Record<string, unknown>;


export const GameStart: FC<GameStartProps> = () => {
  const history = useHistory();

  const goToGamePlayPage = useCallback(
    () => history.push(GAME_PLAY_ROUTE),
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
  const { isOpen, onOpen, onClose } = useDisclosure()



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
            <Button
              w={300}
              colorScheme="purple"
              mb={3}
              boxShadow="dark-lg"
              onClick={goToGamePlayPage}
            >
              Старт
            </Button>
            <Button
              w={300}
              colorScheme="purple"
              mb={3}
              boxShadow="dark-lg"
              onClick={onOpen}
            >
              Как играть
            </Button>
            <Button
              w={300}
              colorScheme="purple"
              boxShadow="dark-lg"
              onClick={goToForumPage}
            >
              На форум
            </Button>
          </Flex>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Как играть</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HowToPlay />
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
  )
}

