import { Box, Button, Flex, Heading, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { FaRegUserCircle } from 'react-icons/fa';
import React from 'react';
import { TTopPanelProps } from 'client/pages/Home/TopPanel/types';


export const TopPanel = ({ isUserAuthenticated, goToProfilePage, goToRegisterPage, goToLoginPage }: TTopPanelProps) => {
  return (
    <Flex alignItems="center" py={2} boxShadow="dark-lg">
      <Box p={2}>
        <Heading size='lg'>
          Three Dots
        </Heading>
      </Box>
      <Spacer/>
      {
        isUserAuthenticated ?
          (
            <IconButton
              aria-label="profile-icon"
              colorScheme="purple"
              mr={4}
              icon={<Icon as={FaRegUserCircle}/>}
              onClick={goToProfilePage}
            />
          ) :
          (
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
    </Flex>
  );
};
