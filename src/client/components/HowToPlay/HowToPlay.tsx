import { Box, Flex, Heading, Kbd, List, ListItem, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';


const CONTROLS_SCHEME = [
  {
    key: 'W',
    title: 'Движение вверх',
  },
  {
    key: 'S',
    title: 'Движение вниз',
  },
  {
    key: 'A',
    title: 'Движение влево',
  },
  {
    key: 'D',
    title: 'Движение вправо',
  },
  {
    key: 'P',
    title: 'Пауза',
  },
];

export const HowToPlay = () => {
  const { mainColorText, bgColorSecond } = useAppSelector(state => state.themeReducer);
  return (
    <Stack
      direction='row'
      divider={<StackDivider borderColor={bgColorSecond} />}
    >

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md' color={mainColorText}>Управление мышью</Heading>
        <Box color={mainColorText}>
          Точка следует в сторону где находится указатель мыши
        </Box>
      </Flex>

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md' color={mainColorText}> Управление клавиатурой</Heading>
        <List spacing={3}>
          {
            CONTROLS_SCHEME.map(({ key, title }) => (
              <ListItem key={key} color={mainColorText}>
                <Kbd bg={bgColorSecond} color={mainColorText} mr={2}>{key}</Kbd>
                - {title}
              </ListItem>
            ))
          }
        </List>
      </Flex>

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md' color={mainColorText}>Правила</Heading>
        <Text color={mainColorText}>
          Точка двигается по игровому полю и поедает другие точки, которые меньше неё по размеру.
        </Text>
      </Flex>
    </Stack >
  );
};
