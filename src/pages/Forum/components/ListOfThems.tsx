import React  from 'react';
import { TListOfThemsProps } from '../types';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { FORUM_ROUTE } from 'constants/routes';
import { Topic } from './Topic';


export const ListOfThems = ({ thems, setTitle, setIsSelected }: TListOfThemsProps) => {

  return (
    <Flex
      boxShadow="dark-lg"
      direction="column"
      m="0"
      w="100%"
      justifyContent="center"
      bg="#ffffff"
      p="10px"
    >
      <Flex justifyContent="start" p="6px">
        <Box w="60%" >
          <Text fontSize="larger" align="center">Тема</Text>
        </Box>
        <Box w="20%">
          <Text fontSize="larger">Дата обновления</Text>
        </Box>
        <Box w="20%">
          <Text fontSize="larger">Последнее сообщение </Text>
        </Box>
      </Flex>
      <Divider orientation="horizontal" border="2px" />
      {thems.map(them => {
        return (
          <Link
            key={them.themId}
            to={`${FORUM_ROUTE}/${them.themId}`}
            onClick={() => {
              setTitle(them.title);
              setIsSelected(true);
            }}
          >
            <Topic them={them} />
          </Link>
        );
      })}
    </Flex>
  );
};
