import { Box, Flex, Heading, List, ListIcon, ListItem, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons"

interface HowToPlayProps {

}

const HowToPlay: FC<HowToPlayProps> = () => {
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
          <ListItem>
            <ListIcon as={ArrowUpIcon} color='black' />
            Движение вверх
          </ListItem>
          <ListItem>
            <ListIcon as={ArrowDownIcon} color='black' />
            Движение вниз
          </ListItem>
          <ListItem>
            <ListIcon as={ArrowBackIcon} color='black' />
            Движение влево
          </ListItem>
          <ListItem>
            <ListIcon as={ArrowForwardIcon} color='black' />
            Движение вправо
          </ListItem>
        </List>
      </Flex>

      <Flex direction="column">
        <Heading as='h3' mb="9px" size='md'>Правила</Heading>
        <Text >
          Точка двигается по игровому полю и поедает другие точки, которые меньше неё по размеру.
        </Text>
      </Flex>
    </Stack >
  );
}

export default HowToPlay;
