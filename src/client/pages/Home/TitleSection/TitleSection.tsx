import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { TRouteChangeCallback } from 'client/pages/Home/types';
import { Background } from 'client/components/Background';


export const TitleSection = ({ goToGameStartPage }: { goToGameStartPage: TRouteChangeCallback }) => {
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
