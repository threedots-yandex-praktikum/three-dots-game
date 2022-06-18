import { Box, Button, Flex, Heading, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import React from 'react';
import { TTopPanelProps } from 'client/pages/Home/TopPanel/types';
import { useAppSelector } from '../../../hooks/useAppSelector';


export const TopPanel = ({ isUserAuthenticated, goToProfilePage, goToRegisterPage, goToLoginPage }: TTopPanelProps) => {
  const { mainColorText, secondColorText, mainColor } = useAppSelector(state => state.themeReducer)

  return (
    <Flex
      alignItems="center" py={2}
      boxShadow="dark-lg"
    >
      <Box p={2}>
        <Heading size='lg' color={mainColorText}>
          Three Dots
        </Heading>
      </Box>
      <Spacer />
      {
        isUserAuthenticated ?
          (
            <IconButton
              aria-label="profile-icon"
              color={secondColorText}
              bgColor={mainColor}
              mr={4}
              icon={<Icon as={FaRegUserCircle} />}
              onClick={goToProfilePage}
            />
          ) :
          (
            <Box>
              <Button
                color={secondColorText}
                bgColor={mainColor}
                // colorScheme="purple"
                mr={4}
                onClick={goToRegisterPage}
              >
                Регистрация
              </Button>
              <Button
                color={secondColorText}
                bgColor={mainColor}
                // colorScheme="purple"
                mr={4}
                onClick={goToLoginPage}
              >
                Вход
              </Button>
            </Box>
          )
      }
    </Flex>
  );
};
