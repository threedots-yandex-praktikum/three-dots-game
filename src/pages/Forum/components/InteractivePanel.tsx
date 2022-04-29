import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FORUM_ROUTE } from 'constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { TInteractivePanelProps } from '../types';



export const InteractivePanel = ({ topicName, onOpen }: TInteractivePanelProps) => {
  return (
        <Flex p="10px" my="15px" boxShadow="dark-lg" bg="#ffffff" w="100%">
            <Box flexGrow={1}>
                <Text as="span">
                    <span>{' > '} </span>
                    <Link className="nav-link" to={FORUM_ROUTE} >
                        Форум
                    </Link>
                </Text>
                {topicName &&
                    <Text display="inline">
                        {' > '}{topicName}
                    </Text>
                }
            </Box>
            <Box w="25%" ml="5px">
                {topicName
                    ? <Button
                        colorScheme="red"
                    >
                        Закрыть тему &times;
                    </Button>
                    : <Button onClick={onOpen} colorScheme="purple">Создать тему +</Button>
                }
            </Box>
        </Flex>
  );
};
