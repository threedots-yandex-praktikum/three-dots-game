import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { TRouteChangeCallback } from 'client/pages/Home/types';
import { Background } from 'client/components/Background';
import { useAppSelector } from '../../../hooks/useAppSelector';


export const TitleSection = ({ goToGameStartPage }: { goToGameStartPage: TRouteChangeCallback }) => {
  const { secondColorText, mainColor, mainColorText } = useAppSelector(state => state.themeReducer)

  return (
    <Background>
      <Flex align="center" justify="center">
        <div>
          <Flex alignItems="center">
            <Heading
              size="4xl"
              color={mainColorText}
            >
              THREE
            </Heading>
            <Spacer />
          </Flex>
          <Flex alignItems="center">
            <Spacer />
            <Heading
              size="4xl"
              color={mainColorText}
            >
              DOTS
            </Heading>
          </Flex>
          <Flex mt={12} justify="center">
            <Button
              size="lg"
              color={secondColorText}
              bgColor={mainColor}
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
