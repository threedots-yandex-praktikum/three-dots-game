import { Box, Flex, Heading, Kbd, List, ListItem, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';


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
  return (
    <Stack
      direction='row'
      divider={<StackDivider borderColor='gray.200' />}
    >

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md'>Управление мышью</Heading>
        <Box>
          Точка следует в сторону где находится указатель мыши
        </Box>
      </Flex>

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md'> Управление клавиатурой</Heading>
        <List spacing={3}>
          {
            CONTROLS_SCHEME.map(({ key, title }) => (
              <ListItem key={key}>
                <Kbd mr={2}>{key}</Kbd>
                - {title}
              </ListItem>
            ))
          }
        </List>
      </Flex>

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md'>Правила</Heading>
        <Text>
          Точка двигается по игровому полю и поедает другие точки, которые меньше неё по размеру.
        </Text>
      </Flex>
    </Stack >
  );
};
